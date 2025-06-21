"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus, FaHome } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Specscart Blog
        </Link>

        <div className="flex gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800 ${
              pathname === "/"
                ? "text-blue-600 font-medium"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            <FaHome />
            Home
          </Link>
          <Link
            href="/create"
            className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800 ${
              pathname === "/create"
                ? "text-blue-600 font-medium"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            <FaPlus />
            New Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
