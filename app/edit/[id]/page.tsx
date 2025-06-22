// app/edit/[id]/page.tsx
import PostForm, { PostPayload } from "@/components/PostForm";
import { getBaseUrl } from "@/lib/baseUrl";
import type { Post } from "@/types/post";
import { notFound } from "next/navigation";

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditPage({ params }: any) {
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
      <PostForm initial={initialData} postId={id} />
    </section>
  );
}
