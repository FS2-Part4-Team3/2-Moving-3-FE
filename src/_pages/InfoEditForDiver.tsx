'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import visibility_off from '@/../public/assets/sign/visibility_off.svg';
import visibility_on from '@/../public/assets/sign/visibility_on.svg';
import { editDriverData, getUserData, patchPassword } from '@/api/UserService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';
import useProfileValidate from '@/hooks/useProfileValidate';
import { RootState } from '@/store/store';

export default function InfoEditForDriver() {
  const { values, setValues, errors, validate, handleChange } = useProfileValidate();
  const [isTouched, setIsTouched] = useState({
    name: false,
    number: false,
    email: false,
    nowPassword: false,
    newPassword: false,
    newPasswordChk: false,
  });
  const [isViewNow, setIsViewNow] = useState(false);
  const [isViewNew, setIsViewNew] = useState(false);
  const [isViewNewChk, setIsViewNewChk] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const isDisabled = isFormValid;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      name: user.name || '',
      number: user.phoneNumber || '',
      email: user.email || '',
    }));
  }, []);

  useEffect(() => {
    setIsFormValid(validate('EDIT'));
  }, [values]);

  const handleInputBlur = (field: keyof typeof isTouched) => {
    setIsTouched(prev => ({ ...prev, [field]: true }));
  };

  const userMutation = useMutation({
    mutationFn: async () => {
      await Promise.all([
        editDriverData(values.name, values.email, values.number),
        patchPassword(values.nowPassword, values.newPassword),
      ]);
    },
    onSuccess: () => {
      router.back();
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const handleSubmit = () => {
    userMutation.mutate();
  };

  return (
    <div className="lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center lg:w-[135.2rem] md:w-[37.5rem] sm:w-[37.5rem] lg:gap-x-[22rem]">
      <div className="flex flex-col ">
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper id="name" type="text" value={values.name} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                이름
              </InputWrapper.Label>
              <InputWrapper.Input
                name="name"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
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
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper id="email" type="text" value={values.email} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                이메일
              </InputWrapper.Label>
              <InputWrapper.Input
                name="email"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.email && isTouched.email ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-gray-300 placeholder-gray-300 focus:outline-none`}
                placeholder="이메일을 입력해 주세요"
                onBlur={() => handleInputBlur('email')}
                disabled
              />
              {errors.email && isTouched.email && (
                <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.email}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
          <InputWrapper id="number" type="text" value={values.number} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                전화번호
              </InputWrapper.Label>
              <InputWrapper.Input
                name="number"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
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
      </div>
      <div className="flex flex-col ">
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper
            id="nowPassword"
            type={isViewNow ? 'text' : 'password'}
            value={values.nowPassword}
            onChange={handleChange}
          >
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                현재 비밀번호
              </InputWrapper.Label>
              <div className="lg:w-[64rem] lg:h-[6.4rem] flex relative">
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
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper
            id="newPassword"
            type={isViewNew ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange}
          >
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                새 비밀번호
              </InputWrapper.Label>
              <div className="lg:w-[64rem] lg:h-[6.4rem] flex relative">
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
        <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
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
              <div className="lg:w-[64rem] lg:h-[6.4rem] flex relative">
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
      <ButtonWrapper id="cancel-btn" onClick={() => router.back()}>
        <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[66rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-[6.4rem] md:mb-[4rem] sm:mb-[4rem] ">
          취소
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="fix-btn" onClick={handleSubmit}>
        <ButtonWrapper.Button
          disabled={!isDisabled}
          className="lg:order-2 md:order-1 sm:order-1 lg:w-[66rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-center text-white lg:mb-[6.4rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
        >
          수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
