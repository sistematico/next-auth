import { requireAdmin } from "@/lib/admin";
import { adminGetUsers } from "@/actions";
import Link from "next/link";
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();
  
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { users, totalPages, currentPage, totalCount } = await adminGetUsers(page, 10);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
            <p className="text-gray-600 mt-2">Total: {totalCount} usuários</p>
          </div>
          <Link
            href="/admin/users/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Novo Usuário
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </Link>
                    <DeleteUserButton userId={user.id} userName={user.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            {currentPage > 1 && (
              <Link
                href={`/admin/users?page=${currentPage - 1}`}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Anterior
              </Link>
            )}
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <Link
                      key={pageNum}
                      href={`/admin/users?page=${pageNum}`}
                      className={`px-3 py-2 rounded-md ${
                        pageNum === currentPage
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return <span key={pageNum}>...</span>;
                }
                return null;
              })}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/admin/users?page=${currentPage + 1}`}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Próxima
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
