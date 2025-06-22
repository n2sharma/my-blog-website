"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegNewspaper, FaHome, FaPlus, FaUserAlt } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  // Shared styles for nav links
  const baseLinkClasses =
    "flex items-center gap-2 px-3 py-1 rounded-md text-sm sm:text-base font-medium transition-colors";

  // Active/inactive styles
  const navLink = (path: string) =>
    `${baseLinkClasses} ${
      pathname === path
        ? "text-blue-600 bg-blue-50 dark:bg-zinc-800"
        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:scale-105 transition-transform"
        >
          <FaRegNewspaper size={26} />
          <span className="font-bold text-lg hidden sm:inline">
            Specscart Blog
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className={navLink("/")}>
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link href="/create" className={navLink("/create")}>
            <FaPlus />
            <span className="hidden sm:inline">New Post</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/naman-sharma001/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseLinkClasses} text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800`}
          >
            <FaUserAlt />
            <span className="hidden sm:inline">About Me</span>
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
