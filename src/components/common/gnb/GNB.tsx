import Image from "next/image";
import logo from "@/../public/assets/common/gnb/logo-icon-text.svg";
import menu from "@/../public/assets/common/gnb/menu.svg";
import Link from "next/link";

export default function GNB() {
  return (
    <div className="w-full lg:h-[8.8rem] sm:h-[5.4rem] flex bg-[#ffffff] border-b border-line-200 items-center">
      <div className="w-full lg:py-[2.6rem] lg:px-[12rem] lg:gap-[8.2rem] sm:py-[1rem] sm:px-[2.4rem] flex items-center">
        <Image
          src={logo}
          alt="logo"
          width={116}
          height={44}
          className="lg:block sm:hidden"
        />
        <Image
          src={logo}
          alt="logo"
          width={80}
          height={34}
          className="lg:hidden sm:block"
        />
        <div className="w-full">
          <Link href="/match-driver" className="lg:block sm:hidden">
            <p className="font-bold text-[1.8rem] leading-[2.6rem] font-black-400">
              기사님 찾기
            </p>
          </Link>
        </div>
        <div className="lg:block sm:hidden">
          <Link href="/sign-in" className="flex items-center justify-center">
            <button className="w-[11.6rem] h-[4.4rem] rounded-[1.6rem] p-[1.6rem] bg-blue-300 flex items-center justify-center font-semibold text-[1.8rem] leading-[2.6rem] text-gray-50">
              로그인
            </button>
          </Link>
        </div>
        <Image
          src={menu}
          alt="menu"
          width={24}
          height={24}
          className="lg:hidden sm:block"
        />
      </div>
    </div>
  );
}
