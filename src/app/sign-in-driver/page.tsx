import logo from "@/../public/assets/sign/sign-logo.svg";
import SignInClient from "@/pages/SignInClient";
import Image from "next/image";
import Link from "next/link";
import google from "@/../public/assets/sign/ic_google.svg";
import kakao from "@/../public/assets/sign/ic_kakao.svg";
import naver from "@/../public/assets/sign/ic_naver.svg";

export default function SignIn() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[120rem] flex flex-col items-center justify-center gap-[7.2rem]">
        <div className="flex flex-col lg:gap-[0.8rem] sm:gap-[0.4rem] lg:w-[68rem] sm:w-[32.7rem] items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={140}
            height={80}
            className="p-[1rem] lg:block sm:hidden"
          />
          <Image
            src={logo}
            alt="logo"
            width={112}
            height={64}
            className="p-[1rem] lg:hidden sm:block"
          />
          <div className="flex gap-[0.8rem] items-center">
            <p className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.2rem] sm:leading-[1.8rem] text-black-200">
              일반 유저라면?
            </p>
            <Link href="/sign-in-driver">
              <p className="font-semibold lg:text-[2rem] sm:text-[1.2rem] leading-[2rem] text-blue-300 underline decoration-blue-300">
                일반 유저 전용 페이지
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[1.6rem]">
          <div className="flex flex-col gap-[5.6rem]">
            <SignInClient />
          </div>
          <div className="flex lg:gap-[0.8rem] sm:gap-[0.4rem] items-center justify-center">
            <p className="font-normal lg:text-[2rem] sm:text-[1.2rem] lg:leading-[3.2rem] sm:leading-[1.8rem] lg:text-black-200 sm:text-black-100">
              아직 무빙 회원이 아니신가요?
            </p>
            <Link href="/sign-up">
              <p className="font-semibold lg:text-[2rem] sm:text-[1.2rem] leading-[2rem] text-blue-300 underline decoration-blue-300">
                이메일로 회원가입하기
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[2.4rem] items-center justify-center">
          <p className="font-normal lg:text-[2rem] sm:text-[1.2rem] lg:leading-[3.2rem] sm:leading-[1.8rem] lg:text-black-200 sm:text-black-100">
            SNS 계정으로 간편 가입하기
          </p>
          <div className="flex lg:gap-[3.2rem] sm:gap-[2.4rem]">
            <Image src={google} alt="google" width={72} height={72} />
            <Image src={kakao} alt="kakao" width={72} height={72} />
            <Image src={naver} alt="naver" width={72} height={72} />
          </div>
        </div>
      </div>
    </div>
  );
}
