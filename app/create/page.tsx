'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    author: '',
    cover: '',
    body: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { title, author, body, cover } = form;
    if (!title || !author || !body) {
      return setError('Please fill in all required fields.');
    }
    if (cover && !isValidUrl(cover)) {
      return setError('Cover image must be a valid URL.');
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Failed to create post');
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>

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
          <label className="block text-sm font-medium">Cover Image URL (optional)</label>
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
          {submitting ? 'Publishing…' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}
