'use client';

import { useRouter } from 'next/navigation';
import { ButtonWrapper } from '@/components/common/headless/Button';

export default function LandingClient() {
  const router = useRouter();

  const handleSignInNavigation = () => {
    router.push('/sign-in');
  };

  const handleSignUpNavigation = () => {
    router.push('/sign-up');
  };

  return (
    <>
      <div className="flex lg:flex-row sm:flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
        <ButtonWrapper id="move-signin" onClick={handleSignInNavigation}>
          <ButtonWrapper.Button className="lg:w-[34rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[5rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white">
            로그인
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="move-signup" onClick={handleSignUpNavigation}>
          <ButtonWrapper.Button className="lg:w-[34rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[5rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-blue-300 bg-white border border-blue-300">
            회원가입
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </>
  );
}
