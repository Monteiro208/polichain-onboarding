'use client';

import Link from "next/link";

interface BotaoLinkProps {
  href: string;
  children: React.ReactNode;
  cor?: "blue" | "green" | "purple";
}

const cores = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  purple: "bg-purple-500 hover:bg-purple-600",
};

export default function LinkButton({ href, children, cor = "blue" }: BotaoLinkProps) {
  return (
    <Link
      href={href}
      className={`w-full ${cores[cor]} text-white font-semibold py-2 px-4 rounded-xl shadow text-center`}
    >
      {children}
    </Link>
  );
}