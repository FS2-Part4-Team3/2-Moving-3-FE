'use client';

import Image from 'next/image';
import { useState } from 'react';
import visibility_off from '@/../public/assets/sign/visibility_off.svg';
import visibility_on from '@/../public/assets/sign/visibility_on.svg';
import { InputWrapper } from '@/components/common/headless/Input';
import type { ProfileEditNormlLeftProps } from '@/interfaces/Page/ProfileEditNormal';

export default function ProfileEditNormalLeft({
  values,
  errors,
  isTouched,
  handleChange,
  handleInputBlur,
}: ProfileEditNormlLeftProps) {
  const [isViewNow, setIsViewNow] = useState(false);
  const [isViewNew, setIsViewNew] = useState(false);
  const [isViewNewChk, setIsViewNewChk] = useState(false);

  return (
    <div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <InputWrapper id="name" type="text" value={values.name} onChange={handleChange}>
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              이름
            </InputWrapper.Label>
            <InputWrapper.Input
              name="name"
              className={`lg:w-[54rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                errors.name && isTouched.name ? 'bg-white border-red-200 border' : 'bg-background-200'
              } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
              placeholder="성함을 입력해 주세요"
              onBlur={() => handleInputBlur('name')}
            />
            {errors.name && isTouched.name && (
              <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                {errors.name}
              </span>
            )}
          </div>
        </InputWrapper>
      </div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <InputWrapper id="email" type="text" value={values.email} onChange={handleChange}>
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              이메일
            </InputWrapper.Label>
            <InputWrapper.Input
              name="email"
              className={`lg:w-[54rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] 
              lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-gray-300 focus:outline-none`}
              onBlur={() => handleInputBlur('email')}
              disabled
            />
          </div>
        </InputWrapper>
      </div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <InputWrapper id="number" type="text" value={values.number} onChange={handleChange}>
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              전화번호
            </InputWrapper.Label>
            <InputWrapper.Input
              name="number"
              className={`lg:w-[54rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                errors.number && isTouched.number ? 'bg-white border-red-200 border' : 'bg-background-200'
              } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
              placeholder="전화번호를 입력해 주세요"
              onBlur={() => handleInputBlur('number')}
            />
            {errors.number && isTouched.number && (
              <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                {errors.number}
              </span>
            )}
          </div>
        </InputWrapper>
      </div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <InputWrapper id="nowPassword" type={isViewNow ? 'text' : 'password'} value={values.nowPassword} onChange={handleChange}>
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              현재 비밀번호
            </InputWrapper.Label>
            <div className="lg:w-[54rem] lg:h-[6.4rem] flex relative">
              <InputWrapper.Input
                name="nowPassword"
                className={`w-full rounded-[1.6rem] p-[1.4rem] ${
                  errors.nowPassword && isTouched.nowPassword ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="현재 비밀번호를 입력해 주세요"
                onBlur={() => handleInputBlur('nowPassword')}
              />
              <Image
                src={isViewNow ? visibility_on : visibility_off}
                alt="visibility"
                width={24}
                height={24}
                onClick={() => setIsViewNow(!isViewNow)}
                className="cursor-pointer absolute top-1/2 right-[1.5rem] transform -translate-y-1/2"
              />
            </div>

            {errors.nowPassword && isTouched.nowPassword && (
              <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                {errors.nowPassword}
              </span>
            )}
          </div>
        </InputWrapper>
      </div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <InputWrapper id="newPassword" type={isViewNew ? 'text' : 'password'} value={values.newPassword} onChange={handleChange}>
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              새 비밀번호
            </InputWrapper.Label>
            <div className="lg:w-[54rem] lg:h-[6.4rem] flex relative">
              <InputWrapper.Input
                name="newPassword"
                className={`w-full rounded-[1.6rem] p-[1.4rem] ${
                  errors.newPassword && isTouched.newPassword ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="새 비밀번호를 입력해 주세요"
                onBlur={() => handleInputBlur('newPassword')}
              />
              <Image
                src={isViewNew ? visibility_on : visibility_off}
                alt="visibility"
                width={24}
                height={24}
                onClick={() => setIsViewNew(!isViewNew)}
                className="cursor-pointer absolute top-1/2 right-[1.5rem] transform -translate-y-1/2"
              />
            </div>

            {errors.newPassword && isTouched.newPassword && (
              <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                {errors.newPassword}
              </span>
            )}
          </div>
        </InputWrapper>
      </div>
      <div className="lg:w-[54rem] md:w-[32.7rem] sm:w-[32.7rem] lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
        <InputWrapper
          id="newPasswordChk"
          type={isViewNewChk ? 'text' : 'password'}
          value={values.newPasswordChk}
          onChange={handleChange}
        >
          <div className="flex flex-col">
            <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
              새 비밀번호 확인
            </InputWrapper.Label>
            <div className="lg:w-[54rem] lg:h-[6.4rem] flex relative">
              <InputWrapper.Input
                name="newPasswordChk"
                className={`w-full rounded-[1.6rem] p-[1.4rem] ${
                  errors.newPasswordChk && isTouched.newPasswordChk ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="새 비밀번호를 다시 한번 입력해 주세요"
                onBlur={() => handleInputBlur('newPasswordChk')}
              />
              <Image
                src={isViewNewChk ? visibility_on : visibility_off}
                alt="visibility"
                width={24}
                height={24}
                onClick={() => setIsViewNewChk(!isViewNewChk)}
                className="cursor-pointer absolute top-1/2 right-[1.5rem] transform -translate-y-1/2"
              />
            </div>

            {errors.newPasswordChk && isTouched.newPasswordChk && (
              <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                {errors.newPasswordChk}
              </span>
            )}
          </div>
        </InputWrapper>
      </div>
    </div>
  );
}
