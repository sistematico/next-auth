"use client";

import { useState } from "react";
import Link from "next/link";

interface AuthNavProps {
  user?: {
    id: string;
    role: "user" | "admin";
  } | null;
}

export function AuthNavClient({ user }: AuthNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/" className="hover:underline transition-all">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:underline transition-all"
            >
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="hover:underline text-purple-600 font-semibold transition-all"
              >
                Admin
              </Link>
            )}
            <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded">
              {user.role}
            </span>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="text-sm hover:underline text-red-600 cursor-pointer transition-all"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/" className="hover:underline transition-all">
              Home
            </Link>
            <Link href="/login" className="hover:underline transition-all">
              Login
            </Link>
            <Link href="/register" className="hover:underline transition-all">
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-50">
          <div className="flex flex-col space-y-2 p-4">
            {user ? (
              <>
                <Link
                  href="/"
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="py-2 px-4 hover:bg-purple-50 text-purple-600 font-semibold rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="py-2 px-4 text-sm text-gray-600 bg-gray-50 rounded">
                  User {user.id} ({user.role})
                </div>
                <form action="/api/auth/logout" method="post">
                  <button
                    type="submit"
                    className="w-full text-left py-2 px-4 hover:bg-red-50 text-red-600 rounded transition-colors"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";

export default async function AuthNav() {
  const user = getUserFromSession(await cookies());

  return <AuthNavClient user={user} />;
}
