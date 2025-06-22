import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import {
  getAllPosts,
  createPost,
} from '@/lib/posts';
import type { Post } from '@/types/post';

/* GET /api/posts */
export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

/* POST /api/posts */
export async function POST(req: Request) {
  const data = (await req.json()) as Partial<Post>;

  if (!data.title || !data.author || !data.body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const post: Post = {
    id: uuid(),
    slug: data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    title: data.title,
    author: data.author,
    cover: data.cover ?? '',
    body: data.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await createPost(post);
  return NextResponse.json(post, { status: 201 });
}
