import { requireAdmin } from "@/lib/admin";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-purple-600">
                Admin Panel
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Usuários
              </Link>
            </div>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
