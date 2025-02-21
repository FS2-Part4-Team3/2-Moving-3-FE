'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import google from '@/../public/assets/sign/ic_google.svg';
import kakao from '@/../public/assets/sign/ic_kakao.svg';
import naver from '@/../public/assets/sign/ic_naver.svg';
import { editUserData, patchPassword, postSignInData, putImage } from '@/api/UserService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';
import ProfileEditNormalLeft from '@/components/section/ProfileEditNormalLeft';
import ProfileEditNormalRight from '@/components/section/ProfileEditNormalRight';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import useProfileValidate from '@/hooks/useProfileValidate';
import { setInfo } from '@/store/slices/InfoSlice';
import { setProfile, setProfileNoImg } from '@/store/slices/ProfileSlice';
import { RootState } from '@/store/store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProfileEditNormal() {
  const { values, setValues, errors, handleChange } = useProfileValidate();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTouched, setIsTouched] = useState({
    name: false,
    number: false,
    email: false,
    nowPassword: false,
    newPassword: false,
    newPasswordChk: false,
  });
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);
  const user_profile = useSelector((state: RootState) => state.profile);
  const user_info = useSelector((state: RootState) => state.info);
  const isDisabled = values.name && values.number && values.nowPassword && values.selectedMovingType && values.selectedRegions;
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      name: user_info.name || (user.name ?? ''),
      email: user_info.email || (user.email ?? ''),
      number: user_profile.phoneNumber || (user.phoneNumber ?? ''),
      selectedRegions: user_profile.areas || [],
      selectedMovingType: user_profile.serviceType || [],
    }));
    setPreviewUrl(user_profile.image || (user.image ?? ''));
  }, [user, user_info, user_profile]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputBlur = (field: keyof typeof isTouched) => {
    setIsTouched(prev => ({ ...prev, [field]: true }));
  };

  const userDataMutation = useMutation({
    mutationFn: async () => {
      let sampleImage = '';
      if (selectedImg) {
        sampleImage = selectedImg.name;
      }
      const response = await editUserData(
        sampleImage,
        values.selectedMovingType,
        values.selectedRegions,
        values.name,
        values.email,
        values.number,
      );

      dispatch(
        setProfileNoImg({
          serviceType: response.serviceType,
          areas: response.areas,
        }),
      );
      dispatch(
        setInfo({
          name: response.name,
          phoneNumber: response.phoneNumber,
        }),
      );

      if (selectedImg === null) return;
      const { uploadUrl } = response;
      const image = await putImage(uploadUrl, selectedImg);
      const res = await editUserData(
        image,
        values.selectedMovingType,
        values.selectedRegions,
        values.name,
        values.email,
        values.number,
      );

      dispatch(
        setProfile({
          image: res.image,
          serviceType: res.serviceType,
          areas: res.areas,
        }),
      );
      dispatch(
        setInfo({
          name: response.name,
          phoneNumber: response.phoneNumber,
        }),
      );
    },
    onSuccess: () => {
      alert('프로필 수정이 완료됐습니다!');
      router.push('/normal/match-driver');
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다. 다시 한 번 시도해주세요!');
      router.push('/not-found');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      await patchPassword(values.nowPassword, values.newPassword);
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다. 다시 한 번 시도해주세요!');
      router.push('/not-found');
    },
  });

  const checkPasswordMutation = useMutation({
    mutationFn: async () => {
      if (user.type && user.email) {
        await postSignInData(user.type, user.email, values.nowPassword);
      }
    },
    onSuccess: () => {
      setIsPasswordCheck(true);
    },
    onError: () => {
      alert('비밀번호가 올바르지 않습니다.');
    },
  });

  const handleUserDataSubmit = () => {
    userDataMutation.mutate();
    if (values?.newPassword.length) {
      changePasswordMutation.mutate();
    }
  };

  const handlePasswordCheck = () => {
    checkPasswordMutation.mutate();
  };

  return (
    <>
      {isPasswordCheck ? (
        <div className="flex flex-col items-center lg:gap-[4rem] md:gap-[2rem] sm:gap-[2rem] lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[3.2rem] lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:mb-0 md:mb-[1.2rem] sm:mb-[1.2rem] font-semibold text-black-400 dark:text-dark-t">
            프로필 수정
          </div>
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.2rem] bg-line-100"></div>
          <div>
            <div className="lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center lg:w-[120rem] md:w-[37.5rem] sm:w-[37.5rem] lg:gap-x-[12rem]">
              <div>
                <ProfileEditNormalLeft
                  values={values}
                  errors={errors}
                  isTouched={isTouched}
                  handleChange={handleChange}
                  handleInputBlur={handleInputBlur}
                  isPasswordCheck={isPasswordCheck}
                />
              </div>
              <div>
                <ProfileEditNormalRight
                  handleImgChange={handleImgChange}
                  handleImgClick={handleImgClick}
                  previewUrl={previewUrl}
                  fileInputRef={fileInputRef}
                  chipProps={{
                    regions,
                    movingTypes,
                    selectedRegions: values.selectedRegions,
                    selectedMovingType: values.selectedMovingType,
                    setSelectedRegions: value => setValues(prev => ({ ...prev, selectedRegions: value })),
                    setSelectedMovingType: value => setValues(prev => ({ ...prev, selectedMovingType: value })),
                  }}
                />
              </div>
              <ButtonWrapper
                id="cancel-btn"
                onClick={() => {
                  router.back();
                }}
              >
                <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[54rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 dark:shadow lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-[15rem] md:mb-[2.4rem] sm:mb-[2.4rem] ">
                  취소
                </ButtonWrapper.Button>
              </ButtonWrapper>
              <ButtonWrapper id="fix-btn" onClick={handleUserDataSubmit}>
                <ButtonWrapper.Button
                  disabled={!isDisabled}
                  className="lg:order-2 md:order-1 sm:order-1 lg:w-[54rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-center text-white lg:mb-[15rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
                >
                  수정하기
                </ButtonWrapper.Button>
              </ButtonWrapper>
            </div>
          </div>
        </div>
      ) : user.provider === null ? (
        <div className="flex flex-col items-center lg:gap-[4rem] md:gap-[2rem] sm:gap-[2rem] lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
          <div className="flex justify-center lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[3.2rem] lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:mb-0 md:mb-[1.2rem] sm:mb-[1.2rem] font-semibold text-black-400 dark:text-dark-t">
            비밀번호 재확인
          </div>
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.2rem] bg-line-100"></div>
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col items-center lg:mt-[5rem]">
            <p className="text-[1.6rem] text-gray-500 mb-[3rem]">개인정보를 위해 회원님의 비밀번호를 다시 한번 확인합니다.</p>
            <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
              <InputWrapper id="email" type="text" value={values.email} onChange={handleChange}>
                <div className="flex flex-col">
                  <InputWrapper.Input
                    name="email"
                    className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] 
              lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-gray-300 focus:outline-none`}
                    onBlur={() => handleInputBlur('email')}
                    disabled
                  />
                </div>
              </InputWrapper>
            </div>

            <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
              <InputWrapper id="nowPassword" type="password" value={values.nowPassword} onChange={handleChange}>
                <div className="flex flex-col">
                  <div className="lg:w-[64rem] lg:h-[6.4rem] flex relative">
                    <InputWrapper.Input
                      name="nowPassword"
                      className={`w-full rounded-[1.6rem] p-[1.4rem] ${
                        errors.nowPassword && isTouched.nowPassword ? 'bg-white border-red-200 border' : 'bg-background-200'
                      } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                      placeholder="현재 비밀번호를 입력해 주세요"
                      onBlur={() => handleInputBlur('nowPassword')}
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
            <div className="lg:flex-row md:flex-col sm:flex-col flex lg:gap-[4rem]">
              <ButtonWrapper
                id="cancel-btn"
                onClick={() => {
                  router.back();
                }}
              >
                <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[30rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 dark:shadow lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-[15rem] md:mb-[2.4rem] sm:mb-[2.4rem] ">
                  취소
                </ButtonWrapper.Button>
              </ButtonWrapper>
              <ButtonWrapper id="fix-btn" onClick={handlePasswordCheck}>
                <ButtonWrapper.Button
                  disabled={!isDisabled}
                  className="lg:order-2 md:order-1 sm:order-1 lg:w-[30rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-center text-white lg:mb-[15rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
                >
                  확인
                </ButtonWrapper.Button>
              </ButtonWrapper>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:gap-[4rem] md:gap-[2rem] sm:gap-[2rem] lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
          <div className="flex justify-center lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[3.2rem] lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:mb-0 md:mb-[1.2rem] sm:mb-[1.2rem] font-semibold text-black-400 dark:text-dark-t">
            계정 재확인
          </div>
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.2rem] bg-line-100"></div>
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col items-center lg:mt-[5rem]">
            <p className="text-[1.6rem] text-gray-500 mb-[3rem]">
              개인정보를 위해 회원님의 계정을 다시 한번 확인합니다. 로그인 했던 소셜 로그인 아이콘을 클릭해주세요.
            </p>
            <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
              <InputWrapper id="email" type="text" value={values.email} onChange={handleChange}>
                <div className="flex flex-col">
                  <InputWrapper.Input
                    name="email"
                    className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] 
              lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-gray-300 focus:outline-none`}
                    onBlur={() => handleInputBlur('email')}
                    disabled
                  />
                </div>
              </InputWrapper>
            </div>
            <div className="lg:flex-row md:flex-col sm:flex-col flex lg:gap-[4rem]">
              <div>
                <ButtonWrapper
                  id="cancel-btn"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[30rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 dark:shadow lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-[15rem] md:mb-[2.4rem] sm:mb-[2.4rem] ">
                    취소
                  </ButtonWrapper.Button>
                </ButtonWrapper>
              </div>
              <div className="lg:block sm:hidden">
                <div className="flex lg:gap-[3.2rem]" onClick={() => setIsPasswordCheck(prev => !prev)}>
                  <a href={`${BASE_URL}/auth/google/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={google} alt="google" width={72} height={72} />
                  </a>
                  <a href={`${BASE_URL}/auth/kakao/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={kakao} alt="kakao" width={72} height={72} />
                  </a>
                  <a href={`${BASE_URL}/auth/naver/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={naver} alt="naver" width={72} height={72} />
                  </a>
                </div>
              </div>
              <div className="lg:hidden sm:block" onClick={() => setIsPasswordCheck(prev => !prev)}>
                <div className="flex sm:gap-[2.4rem] justify-center">
                  <a href={`${BASE_URL}/auth/google/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={google} alt="google" width={54} height={54} />
                  </a>
                  <a href={`${BASE_URL}/auth/kakao/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={kakao} alt="kakao" width={54} height={54} />
                  </a>
                  <a href={`${BASE_URL}/auth/naver/user/verify/${user.id}`} rel="noopener noreferrer">
                    <Image src={naver} alt="naver" width={54} height={54} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
