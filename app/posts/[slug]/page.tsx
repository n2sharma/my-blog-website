// app/posts/[slug]/page.tsx
export const runtime = "nodejs";

import { notFound } from "next/navigation";
import { parseBlocks } from "@/lib/blocks";
import BlockRenderer from "@/components/BlockRenderer";
import type { Post } from "@/types/post";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { getBaseUrl } from "@/lib/baseUrl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostPage({ params }: any) {
  const { slug } = params as { slug: string };

  const posts: Post[] = await fetch(`${getBaseUrl()}/api/posts`, {
    cache: "no-store",
  }).then((r) => r.json());

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const chunks = parseBlocks(post.body);

  return (
    <article className="max-w-3xl mx-auto rounded-xl shadow-md bg-white dark:bg-zinc-900 px-6 pb-12 pt-6 transition-colors mt-4">
      {/* Cover */}
      {post.cover && (
        <div className="mb-6 overflow-hidden rounded-lg shadow-sm">
          <Image
            src={post.cover}
            alt={post.title}
            width={1280}
            height={640}
            className="w-full h-48 sm:h-72 lg:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Title & Meta */}
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 leading-tight">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {new Date(post.createdAt).toLocaleDateString()} &middot; {post.author}
      </p>

      {/* Body with parsed blocks */}
      <div className="prose prose-lg max-w-none">
        {chunks.map((chunk, i) =>
          typeof chunk === "string" ? (
            <p key={i} className="text-gray-900">
              {chunk}
            </p>
          ) : (
            <BlockRenderer key={i} block={chunk} />
          )
        )}
      </div>

      {/* Actions */}
      <div className="mt-12 flex gap-4">
        <Link
          href={`/edit/${post.id}`}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
        >
          <FaEdit />
          Edit
        </Link>

        <DeleteButton id={post.id} />
      </div>
    </article>
  );
}
