// app/page.tsx
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post";

export default async function Home() {
  // 1️⃣ Resolve base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 2️⃣ Fetch posts with error handling
  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

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
