'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import dropdown from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import profile from '@/../public/assets/profile/img_profile_upload.svg';
import { getUserData, patchDriverData, putImage } from '@/api/UserService';
import CareerCalendarCard from '@/components/cards/CareerCalendarCard';
import { ProfileChips } from '@/components/chips/ProfileChips';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import useProfileValidate from '@/hooks/useProfileValidate';
import { RootState } from '@/store/store';
import { DateFormatToYYYYMMDD } from '@/utils/Format';

export default function ProfileEditDriver() {
  const { values, setValues, errors, validate, handleChange } = useProfileValidate();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTouched, setIsTouched] = useState({
    nickname: false,
    career: false,
    shortBio: false,
    description: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const isDisabled = isFormValid;
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);
  console.log(user);
  useEffect(() => {
    setValues(prev => ({
      ...prev,
      nickname: user.nickname || '',
      email: user.email || '',
      career: new Date(user.startAt || ''),
      shortBio: user.introduce || '',
      description: user.description || '',
      selectedRegions: user.availableAreas || [],
      selectedMovingType: user.serviceType || [],
    }));
    setPreviewUrl(user.image || '');
  }, []);

  useEffect(() => {
    setIsFormValid(validate('REGISTER'));
  }, [values]);

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

  const userMutation = useMutation({
    mutationFn: async () => {
      let sampleImage = '';
      let image = '';

      if (selectedImg instanceof File) {
        sampleImage = selectedImg.name;
        const response = await patchDriverData(
          sampleImage,
          values.nickname,
          values.career,
          values.shortBio,
          values.description,
          values.selectedMovingType,
          values.selectedRegions,
        );
        const { uploadUrl } = response;
        image = await putImage(uploadUrl, selectedImg);
      }

      return await patchDriverData(
        image,
        values.nickname,
        values.career,
        values.shortBio,
        values.description,
        values.selectedMovingType,
        values.selectedRegions,
      );
    },
    onSuccess: () => {
      router.back();
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const handleValuesSubmit = () => {
    userMutation.mutate();
  };

  return (
    <div className="lg:w-[135.2rem] lg:grid lg:grid-cols-2 lg:gap-x-[7.2rem] md:flex md:flex-col sm:flex sm:flex-col">
      <div className="lg:w-full md:w-[32.7rem] sm:w-[32.7rem]">
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper id="nickname" type="text" value={values.nickname} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                별명
              </InputWrapper.Label>
              <InputWrapper.Input
                name="nickname"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.nickname && isTouched.nickname ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="사이트에 노출될 이름을 입력해 주세요"
                onBlur={() => handleInputBlur('nickname')}
              />
              {errors.nickname && isTouched.nickname && (
                <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.nickname}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] border-line-100 lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
          <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            프로필 이미지
          </h3>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
          <button onClick={handleImgClick}>
            <div className="relative lg:w-[16rem] lg:h-[16rem] md:w-[10rem] md:h-[10rem] sm:w-[10rem] sm:h-[10rem]">
              <Image src={previewUrl || profile} alt="프로필 등록 이미지" fill className="cursor-pointer" priority />
            </div>
          </button>
        </div>
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper id="career" type="text" value={DateFormatToYYYYMMDD(values.career.toISOString())} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                경력 시작일
              </InputWrapper.Label>
              <div className="lg:w-[64rem] lg:h-[6.4rem] flex relative">
                <InputWrapper.Input
                  disabled
                  name="career"
                  className={`w-full rounded-[1.6rem] p-[1.4rem] ${
                    errors.career && isTouched.career ? 'bg-white border-red-200 border' : 'bg-background-200'
                  } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                  placeholder="기사님의 경력 시작일을 입력해 주세요"
                  onBlur={() => handleInputBlur('career')}
                />
                <Image
                  src={dropdown}
                  alt="open-calendar-btn"
                  width={40}
                  height={40}
                  className="cursor-pointer absolute top-1/2 right-[1.5rem] transform -translate-y-1/2"
                  onClick={() => setIsCareerOpen(prev => !prev)}
                />
              </div>
              {isCareerOpen && (
                <CareerCalendarCard
                  setCareerDate={value => setValues(prev => ({ ...prev, career: value }))}
                  setIsCareerOpen={setIsCareerOpen}
                  initialCareerDate={values.career}
                />
              )}
              {errors.career && isTouched.career && (
                <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.career}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="border-b border-line-100 lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
          <InputWrapper id="shortBio" type="text" value={values.shortBio} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                한 줄 소개
              </InputWrapper.Label>
              <InputWrapper.Input
                name="shortBio"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.shortBio && isTouched.shortBio ? 'bg-white border-red-200 border' : 'bg-background-200'
                } lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="한 줄 소개를 입력해 주세요"
                onBlur={() => handleInputBlur('shortBio')}
              />
              {errors.shortBio && isTouched.shortBio && (
                <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.shortBio}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="lg:mb-[6.4rem] md:mb-[2rem] sm:mb-[2rem] lg:border-none md:border-b sm:border-b border-line-100 lg:pb-0 md:pb-[2rem] sm:pb-[2rem]">
          <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            상세 설명
          </h3>
          <textarea
            value={values.description}
            name="description"
            onChange={handleChange}
            placeholder="상세 내용을 입력해 주세요"
            onBlur={() => handleInputBlur('description')}
            className={`lg:w-[64rem] lg:h-[16rem] md:w-[32.7rem] md:h-[16rem] sm:w-[32.7rem] sm:h-[16rem] rounded-[1.6rem] px-[2.4rem] py-[1.4rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal ${
              errors.description && isTouched.description ? 'bg-white border-red-200 border' : 'bg-background-200'
            } text-black-400 placeholder-gray-300 resize-none focus:outline-none overflow-y: auto`}
          ></textarea>
          {errors.description && isTouched.description && (
            <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
              {errors.description}
            </span>
          )}
        </div>
      </div>
      <div className="lg:w-full md:w-[32.7rem] sm:w-[32.7rem]">
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <h3
            className={`lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 ${
              !errors.selectedMovingType ? 'mb-[1.6rem]' : ''
            }`}
          >
            제공 서비스 <span className="text-blue-300">*</span>
          </h3>
          {errors.selectedMovingType && (
            <span className="lg:text-[1.6rem] sm:text-[1.3rem] text-[1.3rem] font-medium text-red-200 mt-[0.2rem] mb-[2.4rem] self-end block">
              {errors.selectedMovingType}
            </span>
          )}
          <ProfileChips
            movingTypes={movingTypes}
            selectedMovingType={values.selectedMovingType}
            setSelectedMovingType={value => setValues(prev => ({ ...prev, selectedMovingType: value }))}
          />
        </div>
        <div className="lg:mb-[6.8rem] md:mb-[2.4rem] sm:mb-[2.4rem]">
          <h3
            className={`lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 ${
              !errors.selectedRegion ? 'mb-[1.6rem]' : ''
            }`}
          >
            서비스 가능 지역 <span className="text-blue-300">*</span>
          </h3>
          {errors.selectedRegion && (
            <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.2rem] mb-[2.4rem] self-end block">
              {errors.selectedRegion}
            </span>
          )}
          <ProfileChips
            regions={regions}
            selectedRegions={values.selectedRegions}
            setSelectedRegions={value => setValues(prev => ({ ...prev, selectedRegions: value }))}
          />
        </div>
      </div>
      <ButtonWrapper id="profile-register-driver" type="submit" onClick={() => router.back()}>
        <ButtonWrapper.Button
          disabled={!isDisabled}
          className="lg:w-[64rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-center border border-gray-200 bg-white shadow-custom6 text-gray-300 font-semibold lg:mb-[10.4rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
        >
          취소
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="profile-register-driver" type="submit" onClick={handleValuesSubmit}>
        <ButtonWrapper.Button
          disabled={!isDisabled}
          className="lg:w-[64rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-center text-white font-semibold lg:mb-[10.4rem] md:mb-[4rem] sm:mb-[4rem]"
        >
          수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
