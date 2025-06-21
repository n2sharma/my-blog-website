import { NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/posts';
import type { Post } from '@/types/post';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const post = (await readPosts()).find(p => p.id === params.id);
  return post
    ? NextResponse.json(post)
    : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const update = (await req.json()) as Partial<Post>;
  const posts = await readPosts();
  const idx = posts.findIndex(p => p.id === params.id);
  if (idx === -1)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  posts[idx] = { ...posts[idx], ...update, updatedAt: new Date().toISOString() };
  await writePosts(posts);
  return NextResponse.json(posts[idx]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const posts = await readPosts();
  const next = posts.filter(p => p.id !== params.id);
  if (next.length === posts.length)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await writePosts(next);
  return NextResponse.json({ ok: true });
}
