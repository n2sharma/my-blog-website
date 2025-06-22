// components/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { marked } from "marked";

// Remove {{block ...}} tags
function stripBlockTags(content: string) {
  return content.replace(/\{\{block\s+[^}]+}}/g, "").trim();
}

// Render Markdown safely
function renderMarkdownSnippet(md: string) {
  const clean = stripBlockTags(md).slice(0, 200);
  return marked.parseInline(clean);
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/80 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300"
    >
      {post.cover && (
        <div className="overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            width={500}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
          />
        </div>
      )}

      <div className="p-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-blue-600">
          {post.title}
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div
          className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: renderMarkdownSnippet(post.body),
          }}
        />

        <p className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
          Read more →
        </p>
      </div>
    </Link>
  );
}
