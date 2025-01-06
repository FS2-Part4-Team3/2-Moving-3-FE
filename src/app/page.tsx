"use client";

import { ButtonWrapper } from "@/components/common/headless/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignInNavigation = () => {
    router.push("/sign-in");
  };

  const handleSignUpNavigation = () => {
    router.push("/sign-up");
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:py-[8rem] sm:py-[6.5rem]">
      <div className="text-black lg:text-[3.6rem] sm:text-[2.4rem] font-semibold lg:leading-[5rem] sm:leading-[3.4rem] text-center">
        원하는 이사 서비스를 요청하고
        <br />
        견적을 받아보세요
      </div>
      <div className="lg:py-[4.8rem] sm:py-[4.4rem]">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="flex lg:flex-row sm:flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
        <ButtonWrapper id="move-signin" onClick={handleSignInNavigation}>
          <ButtonWrapper.Button className="lg:w-[34rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[5rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white">
            로그인
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="move-signin" onClick={handleSignUpNavigation}>
          <ButtonWrapper.Button className="lg:w-[34rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[5rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-blue-300 bg-white border border-blue-300">
            회원가입
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </div>
  );
}
