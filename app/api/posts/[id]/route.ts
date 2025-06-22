import { NextResponse } from 'next/server';
import {
  getPostById,
  updatePost,
  deletePost,
} from '@/lib/posts';
import type { Post } from '@/types/post';

/* GET /api/posts/[id] */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPostById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

/* PUT /api/posts/[id] */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const patch = (await req.json()) as Partial<Post>;
  await updatePost(params.id, { ...patch, updatedAt: new Date().toISOString() });
  const updated = await getPostById(params.id);
  return NextResponse.json(updated);
}

/* DELETE /api/posts/[id] */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await deletePost(params.id);
  return NextResponse.json({ ok: true });
}
