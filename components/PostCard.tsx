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
      className="group rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 border border-gray-200 bg-white"
    >
      {post.cover && (
        <Image
          src={post.cover}
          alt={post.title}
          width={500}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div
          className="text-gray-600 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: renderMarkdownSnippet(post.body),
          }}
        />

        <p className="mt-2 text-sm text-blue-600 hover:underline">
          Read more →
        </p>
      </div>
    </Link>
  );
}
