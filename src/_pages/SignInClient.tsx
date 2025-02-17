'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import visibility_off from '@/../public/assets/sign/visibility_off.svg';
import visibility_on from '@/../public/assets/sign/visibility_on.svg';
import { postSignInData } from '@/api/UserService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';
import { setProfile } from '@/store/slices/ProfileSlice';
import { setUserSign } from '@/store/slices/SignInSlice';

export default function SignInClient() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (pathname?.startsWith('/normal')) {
      setUserType('user');
    } else if (pathname?.startsWith('/driver')) {
      setUserType('driver');
    }
  }, [pathname]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [viewPw, setViewPw] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError('비밀번호가 올바르지 않습니다.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await postSignInData(userType, email, password);
      document.cookie = `accessToken1=${res.accessToken}; path=/; max-age=3600; secure; HttpOnly; SameSite=Strict`;
      dispatch(
        setUserSign({
          id: res.person.id,
          name: res.person.name,
          nickname: userType === 'driver' ? res.person.nickname : undefined,
          email: res.person.email,
          image: res.person.image,
          phoneNumber: res.person.phoneNumber,
          introduce: res.person.introduce,
          description: res.person.description,
          serviceType: res.person.serviceType,
          availableAreas: userType === 'driver' ? res.person.availableAreas : undefined,
          areas: userType === 'user' ? res.person.areas : undefined,
          type: res.person.type,
          startAt: userType === 'driver' ? res.person.startAt : '',
        }),
      );
      dispatch(
        setProfile({
          serviceType: res.person.serviceType,
          availableAreas: res.person.availableAreas,
          areas: res.person.areas,
        }),
      );
      if (userType === 'user' && res.person.areas?.length && res.person.serviceType?.length) {
        router.push('/normal/match-driver');
      } else if (userType === 'user' && res.person.areas && res.person.serviceType) {
        router.push('/normal/profile-register');
      } else if (
        userType === 'driver' &&
        res.person.introduce &&
        res.person.description &&
        res.person.nickname &&
        res.person.availableAreas?.length &&
        res.person.serviceType?.length
      ) {
        router.push('/driver/receive-quote');
      } else if (
        userType === 'driver' &&
        !res.person.introduce &&
        !res.person.description &&
        !res.person.nickname &&
        res.person.availableAreas &&
        res.person.serviceType
      ) {
        router.push('/driver/profile-register');
      }
    } catch (error) {
      alert('이메일 또는 비밀번호가 일치하지 않습니다');
    }
  };

  const isButtonDisabled = !(email && password && !emailError && !passwordError);

  return (
    <div className="flex flex-col lg:gap-[5.6rem] sm:gap-[3.2rem]">
      <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem]">
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper id="signin-email" type="text" value={email} onChange={handleEmailChange}>
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                이메일
              </InputWrapper.Label>
              <InputWrapper.Input
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none ${
                  emailError ? 'focus:border-red-200' : 'focus:border-blue-300'
                }`}
                placeholder="이메일을 입력해 주세요"
              />
            </div>
          </InputWrapper>
          {emailError && (
            <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              {emailError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper id="signin-password" type={viewPw ? 'text' : 'password'} value={password} onChange={handlePasswordChange}>
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                비밀번호
              </InputWrapper.Label>
              <div
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 focus:outline-none p-[1.4rem] bg-white flex justify-between ${
                  passwordError ? 'focus-within:border-red-200' : 'focus-within:border-blue-300'
                }`}
              >
                <InputWrapper.Input
                  className="w-full font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none"
                  placeholder="비밀번호를 입력해 주세요"
                />
                <Image
                  src={viewPw ? visibility_on : visibility_off}
                  alt="visibility"
                  width={24}
                  height={24}
                  onClick={() => setViewPw(!viewPw)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </InputWrapper>
          {passwordError && (
            <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              {passwordError}
            </p>
          )}
        </div>
      </div>
      <ButtonWrapper id="signin" onClick={handleSubmit}>
        <ButtonWrapper.Button
          className="lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white"
          disabled={isButtonDisabled}
        >
          로그인
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
