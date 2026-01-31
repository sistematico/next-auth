"use client";

import { adminDeleteUser } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteUserButton({
  userId,
  userName,
}: {
  userId: number;
  userName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar o usuário "${userName}"?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await adminDeleteUser(userId);

    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:text-red-300"
    >
      {isDeleting ? "Deletando..." : "Deletar"}
    </button>
  );
}
