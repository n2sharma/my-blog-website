"use client";

import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <PostForm /> {/* no initial, no postId → create mode */}
    </section>
  );
}
