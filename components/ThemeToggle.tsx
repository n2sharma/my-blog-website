"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoids SSR mismatch

  return (
    <button
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
