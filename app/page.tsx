import PostCard from '@/components/PostCard';
import type { Post } from '@/types/post';

export default async function Home() {
  const posts: Post[] = await fetch('http://localhost:3000/api/posts').then(r => r.json());

  return (
    <main className="container mx-auto grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </main>
  );
}
