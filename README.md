# 📝 Specscart Blog Platform

A full-stack blog platform built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

Users can **Create, Read, Edit, and Delete (CRUD)** blog posts. Each post supports dynamic `{{block}}` tags that render custom UI components server-side. All data is stored in a local **JSON file** acting as a simple file-based database.

---

## 🔧 Tech Stack

| Layer       | Stack                                          |
| ----------- | ---------------------------------------------- |
| Framework   | [Next.js 14+](https://nextjs.org) (App Router) |
| Language    | TypeScript                                     |
| Styling     | Tailwind CSS                                   |
| Rendering   | SSR (Server-Side Rendering)                    |
| Data Layer  | JSON file (via Node.js `fs/promises`)          |
| State/Forms | React Client Components                        |

---

## 📁 Folder Structure

specscart-blog/
├─ app/ # App Router entry points
│ ├─ page.tsx # Home page - list all posts
│ ├─ create/page.tsx # Create new post form
│ ├─ edit/[id]/page.tsx # Edit post form
│ ├─ posts/[slug]/page.tsx # Detail view with block rendering
│ └─ api/posts/ # API endpoints (GET, POST, PUT, DELETE)
│ └─ [id]/route.ts
├─ components/ # Reusable UI components
│ ├─ PostCard.tsx
│ ├─ PostForm.tsx
│ ├─ BlockRenderer.tsx
│ └─ DeleteButton.tsx
├─ data/
│ ├─ posts.json # Blog post storage
│ └─ products.ts # Mock product data for {{block}} tags
├─ lib/
│ ├─ posts.ts # File-based data helpers
│ └─ blocks.ts # Block tag parser logic
├─ types/
│ └─ post.d.ts # Post type declaration
├─ public/ # Static images
├─ tailwind.config.ts # Tailwind config
└─ README.md

---

## 🚀 Features Implemented

### ✅ 1. Home Page (`/`)

- Server-rendered list of blog posts
- Shows title, author, snippet, and cover image
- Responsive grid layout with Tailwind

### ✅ 2. Post Detail Page (`/posts/[slug]`)

- SSR-powered full blog view
- Parses and renders `{{block}}` tags
- Dynamically loads custom components (e.g. Top Picks with mock product data)
- Includes Edit and Delete buttons

### ✅ 3. Create Post (`/create`)

- Client-side form using React state
- Validates required fields and image URLs
- Submits to `/api/posts` and writes to `posts.json`

### ✅ 4. Edit Post (`/edit/[id]`)

- Pre-filled form using initial post data
- Sends PUT request to update post in JSON
- Reuses `PostForm` component

### ✅ 5. Delete Post

- Confirmation prompt
- Deletes via `/api/posts/[id]` using DELETE method
- Redirects to homepage after deletion

### ✅ 6. Dynamic `{{block}}` Support

- Uses RegEx to parse and extract attributes like `name`, `image`, `products`
- Renders server-side React components with matching product cards
- Reads mock product data from `data/products.ts`

---

## 🔗 API Endpoints (under `/api/posts`)

| Route             | Method | Purpose           |
| ----------------- | ------ | ----------------- |
| `/api/posts`      | GET    | List all posts    |
| `/api/posts`      | POST   | Create a new post |
| `/api/posts/[id]` | GET    | Get post by ID    |
| `/api/posts/[id]` | PUT    | Update post by ID |
| `/api/posts/[id]` | DELETE | Delete post by ID |

---

## 🧠 How it Works (for React developers new to Next.js)

### App Router vs Pages Router

- We're using **App Router** (`/app` folder), which uses **file-based routing**.
- Every file inside `/app/**/page.tsx` becomes a route.
- API routes go inside `/app/api/**/route.ts`.

### Server Components vs Client Components

- Most pages (like `page.tsx`, detail pages) are **Server Components** by default — they run on the server and return HTML directly.
- Forms (`PostForm.tsx`, `DeleteButton.tsx`) are marked with `'use client'` — they run in the browser and use state/hooks.

### SSR (Server-Side Rendering)

- The home page and detail pages fetch data server-side at request time.
- Pages stay fresh by using `cache: 'no-store'` in `fetch(...)`.

### File-based “Database”

- Instead of using MongoDB or SQL, we use a file: `data/posts.json`
- All read/write operations go through helper functions in `lib/posts.ts`

---

## 🛠️ To Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# Open: http://localhost:3000
```
