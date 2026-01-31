import { cookies } from "next/headers";
import { getUserFromSession } from "./session";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = getUserFromSession(await cookies());
  
  if (!session || session.role !== "admin") {
    redirect("/");
  }
  
  return session;
}

export async function isAdmin() {
  const session = getUserFromSession(await cookies());
  return session?.role === "admin";
}
