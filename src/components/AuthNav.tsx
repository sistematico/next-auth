import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import Link from "next/link";

export default async function AuthNav() {
  const user = getUserFromSession(await cookies());

  return (
    <div className="flex items-center space-x-4 mt-2 md:mt-0">
      {user ? (
        <>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span className="text-sm text-gray-600">
            User {user.id} ({user.role})
          </span>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="text-sm hover:underline text-red-600"
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </>
      )}
    </div>
  );
}
