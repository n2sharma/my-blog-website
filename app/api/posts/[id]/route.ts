// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/posts';
import type { Post } from '@/types/post';

/* helper to pull the id segment */
function getId(req: NextRequest) {
  return req.nextUrl.pathname.split('/').pop() as string;
}

/* GET /api/posts/[id] */
export async function GET(req: NextRequest /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
  const id = getId(req);
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

/* PUT /api/posts/[id] */
export async function PUT(req: NextRequest /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
  const id = getId(req);
  const patch = (await req.json()) as Partial<Post>;
  await updatePost(id, { ...patch, updatedAt: new Date().toISOString() });
  const updated = await getPostById(id);
  return NextResponse.json(updated);
}

/* DELETE /api/posts/[id] */
export async function DELETE(req: NextRequest /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
  const id = getId(req);
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
