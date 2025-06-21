import { NextResponse } from 'next/server';
import { readPosts, writePosts, makePost } from '@/lib/posts';
import type { Post } from '@/types/post';

export async function GET() {
  return NextResponse.json(await readPosts());
}

export async function POST(req: Request) {
  const data = (await req.json()) as Partial<Post>;

  if (!data.title || !data.author || !data.body) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newPost = makePost(data as Omit<Post, 'id' | 'slug' | 'createdAt'>);
  const posts = await readPosts();
  posts.unshift(newPost);
  await writePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}
