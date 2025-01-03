"use client";

import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F3F8FF] text-[#1B92FF] text-center px-4">
      <h1 className="text-[10rem] font-bold">404</h1>
      <p className="text-[2rem] mb-[5rem]">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#1B92FF] text-white w-[15rem] h-[5rem] text-[1.8rem] px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Go Back Home
      </button>
    </div>
  );
}
