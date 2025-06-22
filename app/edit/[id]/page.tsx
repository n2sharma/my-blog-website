// app/edit/[id]/page.tsx
import PostForm, { PostPayload } from "@/components/PostForm";
import { getBaseUrl } from "@/lib/baseUrl";
import type { Post } from "@/types/post";
import { notFound } from "next/navigation";

export const runtime = "nodejs";

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = params;

  const res = await fetch(`${getBaseUrl()}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const post: Post = await res.json();

  const initialData: PostPayload = {
    title: post.title,
    author: post.author,
    cover: post.cover,
    body: post.body,
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Edit Blog Post
      </h1>
      <PostForm initial={initialData} postId={id} />
    </section>
  );
}
