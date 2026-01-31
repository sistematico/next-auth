import { requireAdmin } from "@/lib/admin";
import { UserForm } from "@/components/admin/UserForm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EditUserPage({ params }: { params: Params }) {
  await requireAdmin();

  const { id } = await params;
  const userId = Number(id);

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Editar Usuário
        </h1>
        <UserForm user={user} />
      </div>
    </div>
  );
}
