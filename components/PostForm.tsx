"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./Toast";

export type PostPayload = {
  title: string;
  author: string;
  cover?: string;
  body: string;
};

type Props = {
  initial?: PostPayload;
  postId?: string;
};

export default function PostForm({ initial, postId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PostPayload>(
    initial ?? { title: "", author: "", cover: "", body: "" }
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<null | {
    message: string;
    type?: "success" | "error";
  }>(null);

  const isValidUrl = (url?: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.author || !form.body) {
      return setError("Please fill in all required fields.");
    }

    if (!isValidUrl(form.cover)) {
      return setError("Cover image must be a valid URL.");
    }

    setSubmitting(true);

    try {
      const res = await fetch(postId ? `/api/posts/${postId}` : "/api/posts", {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to save post");
      }

      setToast({
        message: postId ? "Post updated successfully!" : "Post published!",
        type: "success",
      });

      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setError(err.message);
      setToast({
        message: err.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg space-y-6 border border-gray-200 dark:border-zinc-800 transition-all"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {postId ? "Edit Post" : "Create New Post"}
        </h2>

        <FormField
          label="Title *"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Blog title..."
        />

        <FormField
          label="Author *"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
          placeholder="Your Name..."
        />

        <FormField
          label="Cover Image URL"
          name="cover"
          value={form.cover}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <FormTextarea
          label="Body *"
          name="body"
          value={form.body}
          onChange={handleChange}
          required
          placeholder="Supports {{block ...}} tags"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting
            ? postId
              ? "Updating..."
              : "Publishing..."
            : postId
            ? "Update Post"
            : "Publish Post"}
        </button>
      </form>

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

// Reusable input component
function FormField({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Reusable textarea component
function FormTextarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
