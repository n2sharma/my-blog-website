// app/api/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/posts';
import type { Post } from '@/types/post';

// GET /api/posts/[id]
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const posts = await readPosts();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT /api/posts/[id]
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const update = (await req.json()) as Partial<Post>;
  const posts = await readPosts();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  posts[idx] = {
    ...posts[idx],
    ...update,
    updatedAt: new Date().toISOString(),
  };
  await writePosts(posts);
  return NextResponse.json(posts[idx]);
}

// DELETE /api/posts/[id]
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const posts = await readPosts();
  const next = posts.filter(p => p.id !== id);
  if (next.length === posts.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await writePosts(next);
  return NextResponse.json({ ok: true });
}
