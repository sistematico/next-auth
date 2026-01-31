import { requireAdmin } from "@/lib/admin";
import { UserForm } from "@/components/admin/UserForm";

export default async function NewUserPage() {
  await requireAdmin();

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Criar Novo Usuário
        </h1>
        <UserForm />
      </div>
    </div>
  );
}
