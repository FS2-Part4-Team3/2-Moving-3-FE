import logo from "@/../public/assets/sign/sign-logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[120rem] flex flex-col items-center justify-center">
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
        <div>input</div>
      </div>
    </div>
  );
}
