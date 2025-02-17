import DriverMyPageClient from '@/_pages/DriverMyPageClient';

export default async function DriverMyPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white lg:w-[120rem] md:w-[60rem] sm:w-[32.7rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400 lg:py-[3.2rem] sm:py-[1.4rem]">
          마이페이지
        </p>
      </div>
      <DriverMyPageClient />
    </div>
  );
}
