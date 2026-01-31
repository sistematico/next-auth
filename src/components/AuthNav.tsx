import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import { AuthNavClient } from "./AuthNavClient";

export default async function AuthNav() {
  const user = getUserFromSession(await cookies());

  return <AuthNavClient user={user} />;
}
