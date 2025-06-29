// app/page.tsx
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post";
import { getBaseUrl } from "@/lib/baseUrl";

export default async function Home() {
  const res = await fetch(`${getBaseUrl()}/api/posts`, { cache: "no-store" });

  if (!res.ok) {
    // Log the error body for easier debugging in Vercel logs
    const text = await res.text();
    console.error("Failed to fetch posts:", text);
    throw new Error("Failed to load posts");
  }

  const posts: Post[] = await res.json();

  return (
    <main className="container mx-auto grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </main>
  );
}
