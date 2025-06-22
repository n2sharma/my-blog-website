"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow max-w-2xl mx-auto"
    >
      <FormField
        label="Title *"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <FormField
        label="Author *"
        name="author"
        value={form.author}
        onChange={handleChange}
        required
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition disabled:opacity-50"
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
