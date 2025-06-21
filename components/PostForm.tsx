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
  postId?: string; // present in edit mode
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.author || !form.body) {
      return setError("Please fill in all required fields.");
    }
    if (!isValidUrl(form.cover)) {
      return setError("Cover image must be a valid URL.");
    }

    try {
      setSubmitting(true);
      const method = postId ? "PUT" : "POST";
      const endpoint = postId ? `/api/posts/${postId}` : "/api/posts";

      const res = await fetch(endpoint, {
        method,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Author *</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Cover Image URL (optional)
        </label>
        <input
          name="cover"
          value={form.cover}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Body *</label>
        <textarea
          name="body"
          rows={8}
          value={form.body}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          placeholder="Supports {{block ...}} tags"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {submitting
          ? postId
            ? "Updating…"
            : "Publishing…"
          : postId
          ? "Update Post"
          : "Publish Post"}
      </button>
    </form>
  );
}
