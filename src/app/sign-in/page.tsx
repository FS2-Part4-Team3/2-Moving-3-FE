import logo from "@/../public/assets/sign/sign-logo.svg";
import SignInClient from "@/pages/SignInClient";
import Image from "next/image";
import Link from "next/link";
import google from "@/../public/assets/sign/ic_google.svg";
import kakao from "@/../public/assets/sign/ic_kakao.svg";
import naver from "@/../public/assets/sign/ic_naver.svg";

export default function SignIn() {
  const onSubmit = (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[120rem] flex flex-col items-center justify-center gap-[7.2rem]">
        <div className="flex flex-col lg:gap-[0.8rem] sm:gap-[0.4rem] lg:w-[68rem] sm:w-[32.7rem] items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={140}
            height={80}
            className="p-[1rem]"
          />
          <div className="flex gap-[0.8rem] items-center">
            <p className="font-normal text-[2rem] leading-[3.2rem] text-black-200">
              기사님이신가요?
            </p>
            <Link href="/sign-in-driver">
              <p className="font-semibold text-[2rem] leading-[2rem] text-blue-300 underline decoration-blue-300">
                기사님 전용 페이지
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[2.4rem]">
          <div className="flex flex-col gap-[5.6rem]">
            <SignInClient />
          </div>
          <div className="flex gap-[0.8rem] items-center justify-center">
            <p className="font-normal text-[2rem] leading-[3.2rem] text-black-200">
              아직 무빙 회원이 아니신가요?
            </p>
            <Link href="/sign-up">
              <p className="font-semibold text-[2rem] leading-[2rem] text-blue-300 underline decoration-blue-300">
                이메일로 회원가입하기
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem] items-center justify-center">
          <p className="font-normal text-[2rem] leading-[3.2rem] text-black-200">
            SNS 계정으로 간편 가입하기
          </p>
          <div className="flex gap-[3.2rem]">
            <Image src={google} alt="google" width={72} height={72} />
            <Image src={kakao} alt="kakao" width={72} height={72} />
            <Image src={naver} alt="naver" width={72} height={72} />
          </div>
        </div>
      </div>
    </div>
  );
}
