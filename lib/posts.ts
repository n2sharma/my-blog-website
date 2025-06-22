// lib/posts.ts
import clientPromise from "./mongodb";
import { Post } from "@/types/post";

const DB_NAME = "blog";
const COLLECTION = "posts";

export async function readPosts(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return await db.collection<Post>(COLLECTION).find().toArray();
}

export async function writePosts(posts: Post[]): Promise<void> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const col = db.collection<Post>(COLLECTION);

  // Clear and replace (or upsert in a real app)
  await col.deleteMany({});
  await col.insertMany(posts);
}
