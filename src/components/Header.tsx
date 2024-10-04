"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="bg-gray-800 py-4 fixed top-0 w-full z-50">
      <nav className="container mx-auto flex justify-around">
        <Link href="/" className="hover:underline">
          홈
        </Link>
        <Link href="/champions" className="hover:underline">
          챔피언 목록
        </Link>
        <Link href="/items" className="hover:underline">
          아이템 목록
        </Link>
        <Link href="/rotation" className="hover:underline">
          로테이션 챔피언
        </Link>
      </nav>
    </header>
  );
}
