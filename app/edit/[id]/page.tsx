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
  const { title, author, cover, body } = post;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <PostForm
        initial={{ title, author, cover, body } as PostPayload}
        postId={id}
      />
    </div>
  );
}
