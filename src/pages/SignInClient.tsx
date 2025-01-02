"use client";

import { ButtonWrapper } from "@/components/common/headless/Button";
import { InputWrapper } from "@/components/common/headless/Input";
import type { SignInClientProps } from "@/interfaces/Page/SigninInterface";
import { useState } from "react";

export default function SignInClient() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const data = { email, password };
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col gap-[3.2rem]">
        <InputWrapper
          id="signin-email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        >
          <div className="flex flex-col gap-[1.6rem]">
            <InputWrapper.Label className="font-normal text-[2rem] leading-[3.2rem] text-black-400">
              이메일
            </InputWrapper.Label>
            <InputWrapper.Input
              className="w-[64rem] h-[6.4rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal text-[2rem] leading-[3.2rem] placeholder:text-gray-400"
              placeholder="이메일을 입력해 주세요"
            />
          </div>
        </InputWrapper>
        <InputWrapper
          id="signin-password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        >
          <div className="flex flex-col gap-[1.6rem]">
            <InputWrapper.Label className="font-normal text-[2rem] leading-[3.2rem] text-black-400">
              비밀번호
            </InputWrapper.Label>
            <InputWrapper.Input
              className="w-[64rem] h-[6.4rem] rounded-[1.6rem] border border-line-200 p-[1.4rem] bg-white font-normal text-[2rem] leading-[3.2rem] placeholder:text-gray-400"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
        </InputWrapper>
      </div>
      <ButtonWrapper id="signin" onClick={() => handleSubmit()}>
        <ButtonWrapper.Button className="w-[64rem] h-[6.4rem] rounded-[1.6rem] p-[1.6rem] bg-gray-100 font-semibold text-[2rem] leading-[3.2rem] flex items-center justify-center text-white">
          로그인
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </>
  );
}
