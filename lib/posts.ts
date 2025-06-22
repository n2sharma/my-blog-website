// lib/posts.ts
import clientPromise from './mongodb';
import { Post } from '@/types/post';

const DB = 'blog';
const COL = 'posts';

export async function getAllPosts(): Promise<Post[]> {
  const client = await clientPromise;
  return client.db(DB).collection<Post>(COL).find().toArray();
}

export async function getPostById(id: string): Promise<Post | null> {
  const client = await clientPromise;
  return client.db(DB).collection<Post>(COL).findOne({ id });
}

export async function createPost(post: Post) {
  const client = await clientPromise;
  await client.db(DB).collection<Post>(COL).insertOne(post);
}

export async function updatePost(id: string, patch: Partial<Post>) {
  const client = await clientPromise;
  await client
    .db(DB)
    .collection<Post>(COL)
    .updateOne({ id }, { $set: patch });
}

export async function deletePost(id: string) {
  const client = await clientPromise;
  await client.db(DB).collection<Post>(COL).deleteOne({ id });
}
