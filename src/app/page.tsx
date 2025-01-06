import Image from "next/image";
import sm_1 from "@/../public/assets/landing/img_landing_sm_01.svg";
import sm_2 from "@/../public/assets/landing/img_landing_sm_02.svg";
import sm_3 from "@/../public/assets/landing/img_landing_sm_03.svg";
import lg_1 from "@/../public/assets/landing/img_landing_lg_01.svg";
import lg_2 from "@/../public/assets/landing/img_landing_lg_02.svg";
import lg_3 from "@/../public/assets/landing/img_landing_lg_03.svg";
import LandingClient from "@/pages/LandingClient";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:py-[8rem] sm:py-[6.5rem] bg-background-400">
      <p className="text-black lg:text-[3.6rem] sm:text-[2.4rem] font-semibold lg:leading-[5rem] sm:leading-[3.4rem] text-center">
        원하는 이사 서비스를 요청하고
        <br />
        견적을 받아보세요
      </p>
      <div className="flex lg:flex-row sm:flex-col lg:py-[4.8rem] sm:py-[4.4rem] lg:gap-[2.4rem] sm:gap-[3.6rem]">
        <div className="lg:w-[43.2rem] lg:h-[59.8rem] sm:w-[32.7rem] sm:h-[24rem] shadow-customBoth rounded-[2.4rem] bg-blue-100 overflow-hidden relative">
          <div className="pl-[3rem] pt-[2.4rem] lg:gap-[0.8rem] sm:gap-[0.4rem]">
            <p className="lg:text-[2.8rem] sm:text-[2rem] lg:leading-[4rem] sm:leading-[3rem] font-semibold text-black">
              소형이사
            </p>
            <p className="lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.4rem] sm:leading-[2.4rem] font-normal text-gray-400">
              원룸, 투룸, 20평대 미만
            </p>
          </div>
          <Image
            src={sm_1}
            alt="소형이사"
            width={284.16}
            height={182.4}
            className="absolute right-[-5.416rem] bottom-[-0.34rem] lg:hidden sm:block"
          />
          <Image
            src={lg_1}
            alt="소형이사"
            width={366}
            height={304}
            className="absolute right-0 bottom-[3.4rem] lg:block sm:hidden"
          />
        </div>
        <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[3.6rem]">
          <div className="lg:w-[76.4rem] lg:h-[28.7rem] sm:w-[32.7rem] sm:h-[24rem] shadow-custom1 rounded-[2.4rem] bg-white overflow-hidden relative">
            <div className="pl-[3rem] pt-[2.4rem] lg:gap-[0.8rem] sm:gap-[0.4rem]">
              <p className="lg:text-[2.8rem] sm:text-[2rem] lg:leading-[4rem] sm:leading-[3rem] font-semibold text-black">
                가정이사
              </p>
              <p className="lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.4rem] sm:leading-[2.4rem] font-normal text-gray-400">
                쓰리룸, 20평대 미만
              </p>
            </div>
            <Image
              src={sm_2}
              alt="가정이사"
              width={261}
              height={170}
              className="absolute right-[-1.6rem] bottom-[-1.3rem] lg:hidden sm:block"
            />
            <Image
              src={lg_2}
              alt="가정이사"
              width={467}
              height={264}
              className="absolute right-[-1rem] bottom-[-1.5rem] lg:block sm:hidden"
            />
          </div>
          <div className="lg:w-[76.4rem] lg:h-[28.7rem] sm:w-[32.7rem] sm:h-[24rem] shadow-customBoth rounded-[2.4rem] bg-white overflow-hidden relative">
            <div className="pl-[3rem] pt-[2.4rem] lg:gap-[0.8rem] sm:gap-[0.4rem]">
              <p className="lg:text-[2.8rem] sm:text-[2rem] lg:leading-[4rem] sm:leading-[3rem] font-semibold text-black">
                기업, 사무실 이사
              </p>
              <p className="lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.4rem] sm:leading-[2.4rem] font-normal text-gray-400">
                사무실, 상업공간
              </p>
            </div>
            <Image
              src={sm_3}
              alt="기업,사무실 이사"
              width={316.92}
              height={131.14}
              className="absolute right-[-2.192rem] bottom-[-0.1rem] lg:hidden sm:block"
            />
            <Image
              src={lg_3}
              alt="기업,사무실 이사"
              width={511}
              height={219}
              className="absolute right-[-2rem] bottom-[-0.1rem] lg:block sm:hidden"
            />
          </div>
        </div>
      </div>
      <LandingClient />
    </div>
  );
}
