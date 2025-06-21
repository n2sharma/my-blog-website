// // components/DarkToggle.tsx
// "use client";

// import { useEffect, useState } from "react";

// // persist preference in localStorage so page reload keeps the theme
// const THEME_KEY = "theme-dark";

// export default function DarkToggle() {
//   const [dark, setDark] = useState<boolean | null>(null);

//   // 1️⃣ On mount: read saved preference or system preference
//   useEffect(() => {
//     const saved = localStorage.getItem(THEME_KEY);
//     if (saved === "true") {
//       setDark(true);
//     } else if (saved === "false") {
//       setDark(false);
//     } else {
//       // fall back to system preference
//       setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
//     }
//   }, []);

//   // 2️⃣ Whenever `dark` changes, update <html> and localStorage
//   useEffect(() => {
//     if (dark === null) return; // still initializing
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem(THEME_KEY, String(dark));
//   }, [dark]);

//   if (dark === null) return null; // render nothing until state is known

//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       className="ml-4 text-sm px-2 py-1 border rounded
//                  border-gray-400 dark:border-gray-600
//                  hover:bg-gray-200 dark:hover:bg-gray-700"
//     >
//       {dark ? "☀ Light" : "🌙 Dark"}
//     </button>
//   );
// }
