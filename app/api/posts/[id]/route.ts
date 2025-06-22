import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getPostById,
  updatePost,
  deletePost,
} from "@/lib/posts";
import type { Post } from "@/types/post";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const patch = (await req.json()) as Partial<Post>;
  await updatePost(id, { ...patch, updatedAt: new Date().toISOString() });
  const updated = await getPostById(id);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
