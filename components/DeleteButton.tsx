"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
    >
      <FaTrash className="text-base" />
      Delete
    </button>
  );
}
