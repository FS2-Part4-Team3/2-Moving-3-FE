"use client";

import Image from "next/image";
import logo from "@/../public/assets/common/gnb/logo-icon-text.svg";
import menu from "@/../public/assets/common/gnb/menu.svg";
import Link from "next/link";
import close from "@/../public/assets/common/icon_X.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import alarm from "@/../public/assets/common/gnb/alarm.svg";
import profile from "@/../public/assets/common/gnb/default_profile.svg";

export default function GNB() {
  const [modalOpen, isModalOpen] = useState(false);
  const router = useRouter();

  const handleRouteLanding = () => {
    router.push("/");
  };

  // const status = "LogOut";
  // const status = "General";
  const status = "Driver";

  return (
    <>
      <div className="w-full lg:h-[8.8rem] sm:h-[5.4rem] bg-[#ffffff] border-b border-line-200">
        <div className="w-full lg:py-[2.6rem] lg:px-[12rem] lg:gap-[8.2rem] sm:py-[1rem] sm:px-[2.4rem] flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={116}
            height={44}
            className="lg:block sm:hidden cursor-pointer"
            onClick={handleRouteLanding}
          />
          <Image
            src={logo}
            alt="logo"
            width={80}
            height={34}
            className="lg:hidden sm:block cursor-pointer"
            onClick={handleRouteLanding}
          />
          <div className="w-full flex gap-[4rem]">
            {status === "General" && (
              <Link
                href="/request-quote"
                className="lg:block sm:hidden cursor-pointer"
              >
                <p className="font-bold text-[1.8rem] leading-[2.6rem] font-black-400">
                  견적 요청
                </p>
              </Link>
            )}
            {status === "Driver" && (
              <Link
                href="/receive-quote"
                className="lg:block sm:hidden cursor-pointer"
              >
                <p className="font-bold text-[1.8rem] leading-[2.6rem] font-black-400">
                  받은 요청
                </p>
              </Link>
            )}
            {status !== "Driver" && (
              <Link
                href="/match-driver"
                className="lg:block sm:hidden cursor-pointer"
              >
                <p className="font-bold text-[1.8rem] leading-[2.6rem] font-black-400">
                  기사님 찾기
                </p>
              </Link>
            )}
            {status !== "LogOut" && (
              <Link
                href="/my-quotes"
                className="lg:block sm:hidden cursor-pointer"
              >
                <p className="font-bold text-[1.8rem] leading-[2.6rem] font-black-400">
                  내 견적 관리
                </p>
              </Link>
            )}
          </div>
          {status === "LogOut" && (
            <div className="lg:block sm:hidden">
              <Link
                href="/sign-in"
                className="flex items-center justify-center cursor-pointer"
              >
                <button className="w-[11.6rem] h-[4.4rem] rounded-[1.6rem] p-[1.6rem] bg-blue-300 flex items-center justify-center font-semibold text-[1.8rem] leading-[2.6rem] text-gray-50">
                  로그인
                </button>
              </Link>
            </div>
          )}
          {status !== "LogOut" && (
            <div className="flex gap-[3.2rem] items-center justify-end">
              <Image
                src={alarm}
                alt="alarm"
                width={36}
                height={36}
                className="lg:block sm:hidden"
              />
              <Image
                src={alarm}
                alt="alarm"
                width={24}
                height={24}
                className="lg:hidden sm:block"
              />
              <Image
                src={profile}
                alt="profile"
                width={24}
                height={24}
                className="lg:hidden sm:block"
              />
              <div className="flex lg:gap-[1.6rem] sm: gap-[2.4rem] items-center justify-center">
                <Image
                  src={profile}
                  alt="profile"
                  width={36}
                  height={36}
                  className="lg:block sm:hidden"
                />
                <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm: hidden">
                  이름 수정해주세요
                </p>
              </div>
            </div>
          )}
          <Image
            src={menu}
            alt="menu"
            width={24}
            height={24}
            className="lg:hidden sm:block cursor-pointer"
            onClick={() => isModalOpen(true)}
          />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 w-full flex justify-end h-full bg-[#000000] bg-opacity-50 z-10">
          <div className="w-[22rem] bg-[#ffffff] flex flex-col">
            <div className="w-full flex justify-end py-[1rem] px-[1.6rem] gap-[1rem] border-b border-line-200">
              <Image
                src={close}
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => isModalOpen(false)}
              />
            </div>
            <div>
              {status === "General" && (
                <Link href="/request-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    견적 요청
                  </p>
                </Link>
              )}
              {status === "General" && (
                <Link href="/match-driver" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    기사님 찾기
                  </p>
                </Link>
              )}
              {status === "Driver" && (
                <Link href="/receive-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    받은 요청
                  </p>
                </Link>
              )}
              {status !== "LogOut" && (
                <Link href="/request-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === "LogOut" && (
                <Link href="/sign-in" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    로그인
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
