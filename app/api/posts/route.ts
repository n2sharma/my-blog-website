import { NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/posts';
import type { Post } from '@/types/post';
import { v4 as uuid } from 'uuid';

/* GET /api/posts – list */
export async function GET() {
  const posts = await readPosts();
  return NextResponse.json(posts);
}

/* POST /api/posts – create */
export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Post>;

  // basic validation
  if (!body.title || !body.author || !body.body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // build new post
  const post: Post = {
    id: uuid(),
    slug: body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    title: body.title,
    author: body.author,
    body: body.body,
    cover: body.cover ?? '',
    createdAt: new Date().toISOString(),
  };

  // Mongo-based write helper inserts it
  const current = await readPosts();
  current.unshift(post);
  await writePosts(current);

  return NextResponse.json(post, { status: 201 });
}
