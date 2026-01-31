"use server";

import { redirect } from "next/navigation";
import { signInSchema, signUpSchema, adminCreateUserSchema, adminUpdateUserSchema } from "./schemas";
import { db } from "./db";
import { users } from "./db/schema";
import { eq, desc, count } from "drizzle-orm";
import { comparePasswords, generateSalt, hashPassword } from "./lib/password";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession, getUserFromSession } from "./lib/session";

export async function signIn(_state: string | null, formData: FormData) {
  const unsafeData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.query.users.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(users.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession(user, await cookies());

  redirect("/");
}

export async function signUp(_state: string | null, formData: FormData) {
  const unsafeData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to create account";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (existingUser != null) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: users.id, role: users.role });

    if (user == null) return "Unable to create account";
    await createUserSession(user, await cookies());
  } catch {
    return "Unable to create account";
  }

  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}

// Admin helper - verifica se o usuário é admin
async function requireAdmin() {
  const session = getUserFromSession(await cookies());
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

// Admin - Lista usuários com paginação
export async function adminGetUsers(page: number = 1, pageSize: number = 10) {
  await requireAdmin();
  
  const offset = (page - 1) * pageSize;
  
  const [userList, totalCount] = await Promise.all([
    db.query.users.findMany({
      columns: { 
        id: true, 
        name: true, 
        email: true, 
        role: true, 
        createdAt: true,
        updatedAt: true
      },
      orderBy: [desc(users.createdAt)],
      limit: pageSize,
      offset,
    }),
    db.select({ count: count() }).from(users),
  ]);

  return {
    users: userList,
    totalPages: Math.ceil((totalCount[0]?.count ?? 0) / pageSize),
    currentPage: page,
    totalCount: totalCount[0]?.count ?? 0,
  };
}

// Admin - Criar usuário
export async function adminCreateUser(formData: FormData) {
  try {
    await requireAdmin();

    const unsafeData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };

    const { success, data, error } = adminCreateUserSchema.safeParse(unsafeData);

    if (!success) {
      return { error: error.issues[0]?.message || "Dados inválidos" };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      return { error: "Email já está em uso" };
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      salt,
      role: data.role,
    });

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao criar usuário" };
  }
}

// Admin - Atualizar usuário
export async function adminUpdateUser(formData: FormData) {
  try {
    await requireAdmin();

    const unsafeData = {
      id: Number(formData.get("id")),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string || undefined,
      role: formData.get("role") as string,
    };

    const { success, data, error } = adminUpdateUserSchema.safeParse(unsafeData);

    if (!success) {
      return { error: error.issues[0]?.message || "Dados inválidos" };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser && existingUser.id !== data.id) {
      return { error: "Email já está em uso por outro usuário" };
    }

    const updateData: {
      name: string;
      email: string;
      role: string;
      password?: string;
      salt?: string;
    } = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    if (data.password) {
      const salt = generateSalt();
      updateData.password = await hashPassword(data.password, salt);
      updateData.salt = salt;
    }

    await db.update(users).set(updateData).where(eq(users.id, data.id));

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao atualizar usuário" };
  }
}

// Admin - Deletar usuário
export async function adminDeleteUser(userId: number) {
  try {
    const session = await requireAdmin();

    if (Number(session.id) === userId) {
      return { error: "Você não pode deletar sua própria conta" };
    }

    await db.delete(users).where(eq(users.id, userId));

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao deletar usuário" };
  }
}
