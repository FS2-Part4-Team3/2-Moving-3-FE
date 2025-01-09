'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import alarm from '@/../public/assets/common/gnb/alarm.svg';
import profile from '@/../public/assets/common/gnb/default_profile.svg';
import logo from '@/../public/assets/common/gnb/logo-icon-text.svg';
import logo_sm from '@/../public/assets/common/gnb/logo-sm.svg';
import menu from '@/../public/assets/common/gnb/menu.svg';
import close from '@/../public/assets/common/icon_X.svg';
import { ButtonWrapper } from '../headless/Button';

export default function GNB() {
  //TODO: 로그인 여부에 따라서 http://localhost:3000/match-driver 또는 http://localhost:3000/normal/match-driver 결정하기

  const router = useRouter();
  const pathname = usePathname();

  const isRequestQuote = pathname?.includes('request-quote'); // 견적 요청
  const isMatchDriver = pathname?.includes('match-driver'); // 기사님 찾기
  const isMyQuotes = pathname?.includes('my-quotes'); // 내 견적 관리
  const isReceiveQuote = pathname?.includes('receive-quote'); // 받은 요청

  const [modalOpen, isModalOpen] = useState(false);

  const handleRouteLanding = () => {
    router.push('/');
  };

  const status: string = 'LogOut';
  // const status: string = "General";
  // const status: string = "Driver";

  const handleClick = () => {
    router.push('/sign-in');
  };

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
            width={88}
            height={34}
            className="lg:hidden md:block sm:hidden cursor-pointer"
            onClick={handleRouteLanding}
          />
          <Image
            src={logo_sm}
            alt="logo"
            width={28.8}
            height={32.76}
            className="md:hidden sm:block cursor-pointer"
            onClick={handleRouteLanding}
          />
          <div className="w-full flex gap-[4rem]">
            {status === 'General' && (
              <Link href="/request-quote" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isRequestQuote ? 'text-black-400' : 'text-gray-400'}`}>
                  견적 요청
                </p>
              </Link>
            )}
            {status === 'Driver' && (
              <Link href="/receive-quote" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isReceiveQuote ? 'text-black-400' : 'text-gray-400'}`}>
                  받은 요청
                </p>
              </Link>
            )}
            {status !== 'Driver' && (
              <Link href="/match-driver" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMatchDriver ? 'text-black-400' : 'text-gray-400'}`}>
                  기사님 찾기
                </p>
              </Link>
            )}
            {status !== 'LogOut' && (
              <Link href="/my-quotes" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMyQuotes ? 'text-black-400' : 'text-gray-400'}`}>
                  내 견적 관리
                </p>
              </Link>
            )}
          </div>
          {status === 'LogOut' && (
            <div className="lg:block sm:hidden">
              <Link href="/sign-in" className="flex items-center justify-center cursor-pointer">
                <ButtonWrapper id="login-button" onClick={handleClick}>
                  <ButtonWrapper.Button className="w-[11.6rem] h-[4.4rem] rounded-[1.6rem] p-[1.6rem] bg-blue-300 flex items-center justify-center font-semibold text-[1.8rem] leading-[2.6rem] text-white">
                    로그인
                  </ButtonWrapper.Button>
                </ButtonWrapper>
              </Link>
            </div>
          )}
          {status !== 'LogOut' && (
            <div className="flex gap-[3.2rem] items-center justify-end w-full">
              <Image src={alarm} alt="alarm" width={36} height={36} className="lg:block sm:hidden" />
              <Image src={alarm} alt="alarm" width={24} height={24} className="lg:hidden sm:block" />
              <Image src={profile} alt="profile" width={24} height={24} className="lg:hidden sm:block" />
              <div className="flex lg:gap-[1.6rem] sm: gap-[2.4rem] items-center justify-center">
                <Image src={profile} alt="profile" width={36} height={36} className="lg:block sm:hidden" />
                <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm: hidden">이름 수정해주세요</p>
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
              {status === 'General' && (
                <Link href="/request-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    견적 요청
                  </p>
                </Link>
              )}
              {status !== 'Driver' && (
                <Link href="/match-driver" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    기사님 찾기
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/receive-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    받은 요청
                  </p>
                </Link>
              )}
              {status !== 'LogOut' && (
                <Link href="/request-quote" className="cursor-pointer">
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'LogOut' && (
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
