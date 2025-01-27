import LandingClient from '@/_pages/LandingClient';

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:py-[8rem] sm:py-[6.5rem] bg-background-400">
      <p className="text-black lg:text-[3.6rem] sm:text-[2.4rem] font-semibold lg:leading-[5rem] sm:leading-[3.4rem] text-center">
        원하는 이사 서비스를 요청하고
        <br />
        견적을 받아보세요
      </p>
      <LandingClient />
    </div>
  );
}
