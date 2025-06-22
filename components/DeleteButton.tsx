"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Toast from "./Toast";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [toast, setToast] = useState<null | {
    message: string;
    type?: "success" | "error";
  }>(null);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to delete post");
      }

      setToast({ message: "Post deleted successfully", type: "success" });

      // Optional delay before redirect
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setToast({
        message: err.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
      >
        <FaTrash className="text-base" />
        Delete
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
