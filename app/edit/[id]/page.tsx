import PostForm, { PostPayload } from '@/components/PostForm';
import type { Post } from '@/types/post';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs'; // suppress Edge param warnings

export default async function EditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const post: Post | undefined = await fetch(
    `http://localhost:3000/api/posts/${id}`,
    { cache: 'no-store' }
  ).then((r) => (r.ok ? r.json() : undefined));

  if (!post) notFound();

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
