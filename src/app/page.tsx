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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-gray-700 text-xl font-semibold mb-3">
          Authentication Demo
        </h2>
        <p className="text-gray-700 mb-4">
          Complete authentication system built with the latest technologies from
          the React and Next.js ecosystem. Features user registration, secure
          cookie-based session login, and a full administrative panel.
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

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          🚀 Technologies Used
        </h3>
        <div className="space-y-3 text-gray-700">
          <div>
            <h4 className="font-semibold text-blue-600">Frontend</h4>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Next.js 16.1.6</strong> - React framework with App
                Router and Server Components
              </li>
              <li>
                <strong>React 19.2.3</strong> - Library for building user
                interfaces
              </li>
              <li>
                <strong>Tailwind CSS 4</strong> - Utility-first CSS framework
              </li>
              <li>
                <strong>TypeScript 5</strong> - Static typing for JavaScript
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-600">Backend & Database</h4>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Drizzle ORM 0.45.1</strong> - TypeScript-first ORM for
                SQL databases
              </li>
              <li>
                <strong>LibSQL Client 0.17.0</strong> - Client for SQLite
                databases
              </li>
              <li>
                <strong>Zod 4.3.6</strong> - Schema validation and type safety
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600">
              Development Tools
            </h4>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>
                <strong>Biome 2.2.0</strong> - Fast linter and code formatter
              </li>
              <li>
                <strong>pnpm</strong> - Fast and efficient package manager
              </li>
              <li>
                <strong>Drizzle Kit 0.31.8</strong> - CLI for database migrations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
