'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import visibility_off from '@/../public/assets/sign/visibility_off.svg';
import visibility_on from '@/../public/assets/sign/visibility_on.svg';
import { postSignUpData } from '@/api/UserService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';

export default function SignUpClient() {
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

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordChk, setPasswordChk] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [numberError, setNumberError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordChkError, setPasswordChkError] = useState<string>('');

  const [viewPw, setViewPw] = useState<boolean>(false);
  const [viewPwChk, setViewPwChk] = useState<boolean>(false);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    const numberRegex =
      /^(010\d{4}\d{4}|02\d{4}\d{4}|032\d{4}\d{4}|042\d{4}\d{4}|051\d{4}\d{4}|052\d{4}\d{4}|053\d{4}\d{4}|062\d{4}\d{4}|064\d{4}\d{4}|031\d{4}\d{4}|033\d{4}\d{4}|041\d{4}\d{4}|043\d{4}\d{4}|054\d{4}\d{4}|055\d{4}\d{4}|061\d{4}\d{4}|063\d{4}\d{4})$/;
    if (number && !numberRegex.test(number)) {
      setNumberError('숫자만 입력해주세요.');
    } else {
      setNumberError('');
    }
  }, [number]);

  const handleSubmit = async () => {
    try {
      const res = await postSignUpData(userType, email, name, number, password);

      if (userType === 'user') {
        router.push('/normal/sign-in');
      } else if (userType === 'driver') {
        router.push('/driver/sign-in');
      }
      alert('회원가입이 완료되었습니다');
    } catch (error: any) {
      alert(error.data?.message || '회원가입에 실패하였습니다.');
    }
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError('비밀번호가 올바르지 않습니다.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  useEffect(() => {
    if (passwordChk && password !== passwordChk) {
      setPasswordChkError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordChkError('');
    }
  }, [passwordChk]);

  const isButtonDisabled = !(
    email &&
    number &&
    password &&
    passwordChk &&
    !emailError &&
    !numberError &&
    !passwordError &&
    !passwordChkError
  );

  return (
    <div className="flex flex-col lg:gap-[5.6rem] sm:gap-[3.2rem]">
      <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem]">
        <InputWrapper id="signup-name" type="text" value={name} onChange={e => setName(e.target.value)}>
          <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
            <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
              이름
            </InputWrapper.Label>
            <InputWrapper.Input
              className="lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none dark:bg-dark-p"
              placeholder="이름을 입력해 주세요"
            />
          </div>
        </InputWrapper>
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper id="signup-email" type="text" value={email} onChange={e => setEmail(e.target.value)}>
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
                이메일
              </InputWrapper.Label>
              <InputWrapper.Input
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none dark:bg-dark-p ${
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
          <InputWrapper id="signup-phone-number" type="text" value={number} onChange={e => setNumber(e.target.value)}>
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
                전화번호
              </InputWrapper.Label>
              <InputWrapper.Input
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none dark:bg-dark-p ${
                  numberError ? 'focus:border-red-200' : 'focus:border-blue-300'
                }`}
                placeholder="숫자만 입력해 주세요"
              />
            </div>
          </InputWrapper>
          {numberError && (
            <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              {numberError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper
            id="signup-password"
            type={viewPw ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
                비밀번호
              </InputWrapper.Label>
              <div
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 focus:outline-none p-[1.4rem] bg-white flex justify-between dark:bg-dark-p ${
                  passwordError ? 'focus-within:border-red-200' : 'focus-within:border-blue-300'
                }`}
              >
                <InputWrapper.Input
                  className="w-full font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none dark:bg-dark-p"
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
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper
            id="signup-password-chk"
            type={viewPwChk ? 'text' : 'password'}
            value={passwordChk}
            onChange={e => setPasswordChk(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
                비밀번호 확인
              </InputWrapper.Label>
              <div
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 focus:outline-none p-[1.4rem] bg-white flex justify-between dark:bg-dark-p ${
                  passwordChkError ? 'focus-within:border-red-200' : 'focus-within:border-blue-300'
                }`}
              >
                <InputWrapper.Input
                  className="w-full font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none dark:bg-dark-p"
                  placeholder="비밀번호를 다시 한 번 입력해 주세요"
                />
                <Image
                  src={viewPwChk ? visibility_on : visibility_off}
                  alt="visibility"
                  width={24}
                  height={24}
                  onClick={() => setViewPwChk(!viewPwChk)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </InputWrapper>
          {passwordChkError && (
            <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              {passwordChkError}
            </p>
          )}
        </div>
      </div>
      <ButtonWrapper id="signup" onClick={() => handleSubmit()}>
        <ButtonWrapper.Button
          className="lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white"
          disabled={isButtonDisabled}
        >
          시작하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
