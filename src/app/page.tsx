import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const user = getUserFromSession(await cookies());

  if (user) {
    return (
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">You are logged in</h2>
          <p className="text-gray-700 mb-4">
            User ID: {user.id}
            <br />
            Role: {user.role}
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <form action="/api/auth/logout" method="post" className="inline">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-gray-700 text-xl font-semibold mb-3">
          Authentication Demo
        </h2>
        <p className="text-gray-700 mb-4">
          This is a simple authentication system built with Next.js 16 App
          Router. You can register a new account or log in with existing
          credentials.
        </p>
        <div className="space-x-2">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
