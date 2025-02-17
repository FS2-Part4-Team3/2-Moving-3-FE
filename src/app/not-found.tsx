'use client';

import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  const handleBackNavigation = () => {
    if (document.referrer) {
      router.push(document.referrer);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F3F8FF] text-[#1B92FF] text-center px-4">
      <h1 className="text-[10rem] font-bold">404</h1>
      <p className="text-[2rem] mb-[5rem]">접근하신 페이지에서 오류가 났습니다!</p>
      <button
        onClick={handleBackNavigation}
        className="bg-[#1B92FF] text-white w-fit h-[5rem] text-[1.8rem] px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
}
