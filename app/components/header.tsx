"use client";

import Link from "next/link";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 py-2 w-full bg-[#0B2A54] dark:bg-white backdrop-blur-sm border-b border-gray-200 dark:border-gray-200 z-30">
      <div className="flex items-center px-4 py-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[#0b1f3b] dark:hover:bg-gray-300 dark:active:bg-gray-300 touch-manipulation transition-colors duration-200"
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="w-6 h-6 text-white dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="ml-4">
          <Link href="/">
            <img
              src="assets/logos/logo_dark.png"
              alt="AIChE Logo"
              className="h-8 w-auto block dark:hidden"
            />
          </Link>
          <Link href="/">
            <img
              src="assets/logos/logo_light.png"
              alt="AIChE Logo"
              className="h-8 w-auto hidden dark:block"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}