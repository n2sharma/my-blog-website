export interface Post {
  id: string;
  slug: string;
  title: string;
  cover?: string;
  author: string;
  body: string;      // can include {{block …}}
  createdAt: string; // ISO
  updatedAt?: string;
}