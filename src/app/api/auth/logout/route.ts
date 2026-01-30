import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { logOut } from "@/actions";

export async function POST() {
  await logOut();
}
