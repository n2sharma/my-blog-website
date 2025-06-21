import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { Post } from '@/types/post';

const DB_PATH = path.join(process.cwd(), 'data', 'posts.json');

export async function readPosts(): Promise<Post[]> {
  const json = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(json) as Post[];
}

export async function writePosts(posts: Post[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2));
}

export function makePost(p: Omit<Post, 'id' | 'slug' | 'createdAt'>): Post {
  const slug = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    ...p,
    id: uuid(),
    slug,
    createdAt: new Date().toISOString(),
  };
}
