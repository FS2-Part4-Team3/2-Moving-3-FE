"use client";

import { ButtonWrapper } from "@/components/common/headless/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import sm_1 from "@/../public/assets/landing/img_landing_sm_01.svg";
import sm_2 from "@/../public/assets/landing/img_landing_sm_02.svg";
import sm_3 from "@/../public/assets/landing/img_landing_sm_03.svg";

export default function Home() {
  const router = useRouter();

  const handleSignInNavigation = () => {
    router.push("/sign-in");
  };

  const handleSignUpNavigation = () => {
    router.push("/sign-up");
  };

  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:py-[8rem] sm:py-[6.5rem] bg-background-400">
      <div className="text-black lg:text-[3.6rem] sm:text-[2.4rem] font-semibold lg:leading-[5rem] sm:leading-[3.4rem] text-center">
        원하는 이사 서비스를 요청하고
        <br />
        견적을 받아보세요
      </div>
      <div className="flex flex-col lg:py-[4.8rem] sm:py-[4.4rem] gap-[3.6rem]">
        <div className="w-[32.7rem] h-[24rem] shadow-customBoth rounded-[2.4rem] bg-blue-100 overflow-hidden relative">
          <div className="pl-[3rem] pt-[2.4rem] gap-[0.4rem]">
            <p className="text-[2rem] leading-[3rem] font-semibold text-black">
              소형이사
            </p>
            <p className="text-[1.4rem] leading-[2.4rem] font-normal text-gray-400">
              원룸, 투룸, 20평대 미만
            </p>
          </div>
          <Image
            src={sm_1}
            alt="소형이사"
            width={284.16}
            height={182.4}
            className="absolute right-[-5.416rem] bottom-[-0.34rem]"
          />
        </div>
        <div className="w-[32.7rem] h-[24rem] shadow-custom1 rounded-[2.4rem] bg-white overflow-hidden relative">
          <div className="pl-[3rem] pt-[2.4rem] gap-[0.4rem]">
            <p className="text-[2rem] leading-[3rem] font-semibold text-black">
              가정이사
            </p>
            <p className="text-[1.4rem] leading-[2.4rem] font-normal text-gray-400">
              쓰리룸, 20평대 미만
            </p>
          </div>
          <Image
            src={sm_2}
            alt="가정이사"
            width={261}
            height={170}
            className="absolute right-[-1.6rem] bottom-[-1.3rem]"
          />
        </div>
        <div className="w-[32.7rem] h-[24rem] shadow-customBoth rounded-[2.4rem] bg-white overflow-hidden relative">
          <div className="pl-[3rem] pt-[2.4rem] gap-[0.4rem]">
            <p className="text-[2rem] leading-[3rem] font-semibold text-black">
              기업, 사무실 이사
            </p>
            <p className="text-[1.4rem] leading-[2.4rem] font-normal text-gray-400">
              사무실, 상업공간
            </p>
          </div>
          <Image
            src={sm_3}
            alt="기업, 사무실 이사"
            width={316.92}
            height={131.14}
            className="absolute right-[-2.192rem] bottom-[-0.1rem]"
          />
        </div>
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
