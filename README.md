# 📝 Specscart Blog Platform Assignment

A full-featured blogging platform built with **Next.js App Router** and **TypeScript**, supporting dynamic content blocks like `{{block ...}}`. This project is part of the Full Stack Developer Assessment for Specscart.

## 🚀 Live Demo

🔗 [View Live](https://my-blog-website-qik8.vercel.app/)

---

## 📌 Features

### ✅ Core Features

- **Home Page (`/`)**: Server-rendered list of blog posts with title, author, snippet, image, and date.
- **Post Detail Page (`/posts/[slug]`)**:
  - SSR with full post rendering
  - Parses and renders custom dynamic `{{block}}` tags
- **Create/Edit Blog Page (`/create`, `/edit/[id]`)**:
  - Title, Author, Cover Image, and Body inputs
  - Client-side validation
- **API Routes (`/api/posts`)**:
  - `GET /api/posts`: Fetch all posts
  - `GET /api/posts/[id]`: Fetch a post by ID
  - `POST /api/posts`: Create a post
  - `PUT /api/posts/[id]`: Update a post
  - `DELETE /api/posts/[id]`: Delete a post
- **Dynamic Block Parser**:
  - Custom tags like `{{block name="Top Picks" image="/top-products.png" products="SKU123,SKU456"}}` rendered as reusable UI components
- **Database**:
  - Cloud MongoDB used for CRUD operations

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Rendering**: Server-Side Rendering (SSR)
- **Database**: MongoDB Atlas
- **Icons**: React Icons

---

## 🧠 Block Parsing Example

**Input in Blog Body**:

```text
Check out our top products below!
{{block name="Top Picks" image="/top-products.png" products="SKU123,SKU456"}}


📁 Folder Structure
.
├── app/
│   ├── api/posts/               # API routes (GET, POST, PUT, DELETE)
│   ├── create/                  # Create post form
│   ├── edit/[id]/              # Edit post form
│   ├── posts/[slug]/           # Post detail page
│   └── page.tsx                # Homepage
├── components/                 # Reusable components like PostCard, PostForm, etc.
├── data/products.ts            # Mock product data for {{block}} rendering
├── lib/                        # MongoDB client and utilities
├── types/                      # TypeScript types
├── public/                     # Static assets
└── README.md


📦 Setup Instructions

1. Clone the repo
- git clone https://github.com/n2sharma/my-blog-website.git
- cd my-blog-website


2. Install dependencies
- npm install

3. Add .env.local
- MONGODB_URI=your_mongodb_connection_string
- NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run locally
- npm run dev

🙋‍♂️ Author
Naman Sharma
📧 namansharma714@gmail.com
🔗 https://www.linkedin.com/in/naman-sharma001
```
