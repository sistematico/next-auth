import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { users } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAdmin();

  const [totalUsers, adminCount, userCount] = await Promise.all([
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(users).where(eq(users.role, "admin")),
    db.select({ count: count() }).from(users).where(eq(users.role, "user")),
  ]);

  const stats = [
    {
      name: "Total de Usuários",
      value: totalUsers[0]?.count || 0,
      color: "blue",
      href: "/admin/users",
    },
    {
      name: "Administradores",
      value: adminCount[0]?.count || 0,
      color: "purple",
      href: "/admin/users",
    },
    {
      name: "Usuários Comuns",
      value: userCount[0]?.count || 0,
      color: "green",
      href: "/admin/users",
    },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard Admin
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.name}
              </p>
              <p className={`text-4xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Links Rápidos
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-md transition"
            >
              📋 Gerenciar Usuários
            </Link>
            <Link
              href="/admin/users/new"
              className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-md transition"
            >
              ➕ Criar Novo Usuário
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
