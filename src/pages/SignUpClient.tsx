"use client";

import { ButtonWrapper } from "@/components/common/headless/Button";
import { InputWrapper } from "@/components/common/headless/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
import visibility_off from "@/../public/assets/sign/visibility_off.svg";
import visibility_on from "@/../public/assets/sign/visibility_on.svg";

export default function SignUpClient() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChk, setPasswordChk] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordChkError, setPasswordChkError] = useState<string>("");

  const [viewPw, setViewPw] = useState<boolean>(false);
  const [viewPwChk, setViewPwChk] = useState<boolean>(false);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    const phoneNumberRegex = /^\d+$/;
    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("숫자만 입력해주세요.");
    } else {
      setPhoneNumberError("");
    }
  }, [phoneNumber]);

  const handleSubmit = () => {
    const data = { email, password };
    console.log(data);
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError("비밀번호가 올바르지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    if (passwordChk && password !== passwordChk) {
      setPasswordChkError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordChkError("");
    }
  }, [passwordChk]);

  const isButtonDisabled = !(
    email &&
    phoneNumber &&
    password &&
    passwordChk &&
    !emailError &&
    !phoneNumberError &&
    !passwordError &&
    !passwordChkError
  );

  return (
    <div className="flex flex-col lg:gap-[5.6rem] sm:gap-[3.2rem]">
      <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem]">
        <InputWrapper
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
            <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
              이름
            </InputWrapper.Label>
            <InputWrapper.Input
              className="lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none"
              placeholder="이름을 입력해 주세요"
            />
          </div>
        </InputWrapper>
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper
            id="signup-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                이메일
              </InputWrapper.Label>
              <InputWrapper.Input
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none ${
                  emailError ? "focus:border-red-200" : "focus:border-blue-300"
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
          <InputWrapper
            id="signup-phone-number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                전화번호
              </InputWrapper.Label>
              <InputWrapper.Input
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none ${
                  phoneNumberError
                    ? "focus:border-red-200"
                    : "focus:border-blue-300"
                }`}
                placeholder="숫자만 입력해 주세요"
              />
            </div>
          </InputWrapper>
          {phoneNumberError && (
            <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              {phoneNumberError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[0.8rem] items-end">
          <InputWrapper
            id="signup-password"
            type={viewPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                비밀번호
              </InputWrapper.Label>
              <div
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 focus:outline-none p-[1.4rem] bg-white flex justify-between ${
                  passwordError
                    ? "focus-within:border-red-200"
                    : "focus-within:border-blue-300"
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
            type={viewPwChk ? "text" : "password"}
            value={passwordChk}
            onChange={(e) => setPasswordChk(e.target.value)}
          >
            <div className="flex flex-col lg:gap-[1.6rem] sm:gap-[0.8rem]">
              <InputWrapper.Label className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
                비밀번호 확인
              </InputWrapper.Label>
              <div
                className={`lg:w-[64rem] lg:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] border border-line-200 focus:outline-none p-[1.4rem] bg-white flex justify-between ${
                  passwordChkError
                    ? "focus-within:border-red-200"
                    : "focus-within:border-blue-300"
                }`}
              >
                <InputWrapper.Input
                  className="w-full font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder:text-gray-400 focus:outline-none"
                  placeholder="비밀번호를 다시 한 번 입력해 주세요"
                />
                <Image
                  src={viewPwChk ? visibility_on : visibility_off}
                  alt="visibility"
                  width={24}
                  height={24}
                  onClick={() => setViewPwChk(!viewPwChk)}
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
