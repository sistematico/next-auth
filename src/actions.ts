"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, generateSalt, hashPassword } from "./lib/password";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession } from "./lib/session";

export async function signIn(state: string | null, formData: FormData) {
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

export async function signUp(state: string | null, formData: FormData) {
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
