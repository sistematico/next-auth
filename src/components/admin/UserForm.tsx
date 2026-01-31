"use client";

import { useActionState } from "react";
import { adminCreateUser, adminUpdateUser } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function UserForm({ user }: { user?: User }) {
  const router = useRouter();
  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const result = user
        ? await adminUpdateUser(formData)
        : await adminCreateUser(formData);

      if (result.error) {
        return result.error;
      }

      router.push("/admin/users");
      router.refresh();
      return null;
    },
    null,
  );

  return (
    <form action={formAction} className="bg-white shadow-md rounded-lg p-6">
      {user && <input type="hidden" name="id" value={user.id} />}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Senha {user && "(deixe em branco para manter a atual)"}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required={!user}
          minLength={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Permissão
        </label>
        <select
          id="role"
          name="role"
          defaultValue={user?.role || "user"}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          {isPending ? "Salvando..." : user ? "Atualizar" : "Criar"}
        </button>
        <Link
          href="/admin/users"
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-center transition"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
