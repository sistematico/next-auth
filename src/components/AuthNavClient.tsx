"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Shield, User, LogOut, UserPlus, Cog } from "lucide-react";

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
            <Link href="/" className="flex items-center gap-2">
              <Home className="inline-block w-5 h-5 mr-1" />
              Home
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Cog className="inline-block w-5 h-5 mr-1" />
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 text-purple-600"
              >
                <Shield className="inline-block w-5 h-5 mr-1" />
                Admin
              </Link>
            )}
            <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded">
              {user.role}
            </span>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="flex items-center gap-2 text-red-600 cursor-pointer"
              >
                <LogOut className="inline-block w-5 h-5 mr-1" />
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/" className="flex items-center gap-2">
              <Home className="inline-block w-5 h-5 mr-1" />
              Home
            </Link>
            <Link href="/login" className="flex items-center gap-2">
              <User className="inline-block w-5 h-5 mr-1" />
              Login
            </Link>
            <Link href="/register" className="flex items-center gap-2">
              <UserPlus className="inline-block w-5 h-5 mr-1" />
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-background border-b border-gray-200 shadow-lg md:hidden z-50">
          <div className="flex flex-col space-y-2 p-4">
            {user ? (
              <>
                <Link
                  href="/"
                  className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="inline-block mr-1" />
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Cog className="inline-block w-5 h-5 mr-1" />
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="py-2 px-4 flex items-center gap-2 text-purple-600 font-semibold rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="inline-block w-5 h-5 mr-1" />
                    Admin
                  </Link>
                )}
                <div className="py-2 px-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded">
                  User {user.id} ({user.role})
                </div>
                <form action="/api/auth/logout" method="post">
                  <button
                    type="submit"
                    className="w-full text-left py-2 px-4 flex items-center gap-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                  >
                    <LogOut className="inline-block w-5 h-5 mr-1" />
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="inline-block w-5 h-5 mr-1" />
                  Home
                </Link>
                <Link
                  href="/login"
                  className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="inline-block w-5 h-5 mr-1" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="inline-block w-5 h-5 mr-1" />
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
