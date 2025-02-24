'use client';

import { animated, useSpring } from '@react-spring/web';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import dropdown from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import profile from '@/../public/assets/profile/img_profile_upload.svg';
import { patchDriverData, putImage } from '@/api/UserService';
import CareerCalendarCard from '@/components/cards/CareerCalendarCard';
import { ProfileChips } from '@/components/chips/ProfileChips';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { InputWrapper } from '@/components/common/headless/Input';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import useProfileValidate from '@/hooks/useProfileValidate';
import { setProfile, setProfileNoImg } from '@/store/slices/ProfileSlice';
import { DateFormatToYYYYMMDD } from '@/utils/Format';

export default function ProfileRegisterDriver() {
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

  const [isCareer, setIsCareer] = useState(false);
  const [isCareerVisible, setIsCareerVisible] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

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

  const userDataMutation = useMutation({
    mutationFn: async () => {
      let sampleImage = '';
      if (selectedImg) {
        sampleImage = selectedImg.name;
      }
      const response = await patchDriverData(
        sampleImage,
        values.nickname,
        values.career,
        values.shortBio,
        values.description,
        values.selectedMovingType,
        values.selectedRegions,
      );

      dispatch(
        setProfileNoImg({
          nickname: response.nickname,
          startAt: response.startAt,
          introduce: response.introduce,
          description: response.description,
          serviceType: response.serviceType,
          availableAreas: response.availableAreas,
        }),
      );

      if (selectedImg === null) return;
      const { uploadUrl } = response;
      const image = await putImage(uploadUrl, selectedImg);
      const res = await patchDriverData(
        image,
        values.nickname,
        values.career,
        values.shortBio,
        values.description,
        values.selectedMovingType,
        values.selectedRegions,
      );

      dispatch(
        setProfile({
          image: res.image,
          nickname: res.nickname,
          startAt: res.startAt,
          introduce: res.introduce,
          description: res.description,
          serviceType: res.serviceType,
          availableAreas: res.availableAreas,
        }),
      );
    },
    onSuccess: () => {
      alert('프로필 등록이 완료됐습니다!');
      router.push('/driver/receive-quote');
    },
    onError: () => {
      alert('프로필 등록에 실패했습니다. 다시 한 번 시도해주세요!');
      router.push('/not-found');
    },
  });

  useEffect(() => {
    if (isCareer) {
      setIsCareerVisible(true);
    } else {
      setTimeout(() => setIsCareerVisible(false), 300);
    }
  }, [isCareer]);

  const careerDropdownAnimation = useSpring({
    opacity: isCareer ? 1 : 0,
    transform: 'translateY(10px)',
    height: 'auto',
    config: { tension: 250, friction: 30 },
  });

  const handleUserDataSubmit = () => {
    userDataMutation.mutate();
  };

  return (
    <div className="lg:w-[120rem] lg:grid lg:grid-cols-2 lg:gap-[7.2rem] md:flex md:flex-col sm:flex sm:flex-col lg:ml-[2rem]">
      <div className="lg:mt-[4.8rem] md:mt-[2rem] sm:mt-[2rem] lg:w-full md:w-[32.7rem] sm:w-[32.7rem]">
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] border-line-100 lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
          <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t mb-[1.6rem]">
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
          <InputWrapper id="nickname" type="text" value={values.nickname} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t mb-[1.6rem]">
                별명 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <InputWrapper.Input
                name="nickname"
                className={`lg:w-[54rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
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
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <InputWrapper id="career" type="text" value={DateFormatToYYYYMMDD(values.career.toISOString())} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t mb-[1.6rem]">
                경력 시작일 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <div className="lg:w-[54rem] lg:h-[6.4rem] flex relative">
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
                  onClick={() => setIsCareer(prev => !prev)}
                />
              </div>
              {isCareerVisible && (
                <animated.div style={careerDropdownAnimation}>
                  <CareerCalendarCard
                    setCareerDate={value => setValues(prev => ({ ...prev, career: value }))}
                    setIsCareerOpen={setIsCareer}
                    initialCareerDate={values.career}
                  />
                </animated.div>
              )}
              {errors.career && isTouched.career && (
                <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.career}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="lg:border-none md:border-b sm:border-b md:border-line-100 sm:border-line-100 lg:pb-0 md:pb-[2rem] sm:pb-[2rem]">
          <InputWrapper id="shortBio" type="text" value={values.shortBio} onChange={handleChange}>
            <div className="flex flex-col">
              <InputWrapper.Label className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t mb-[1.6rem]">
                한 줄 소개 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <InputWrapper.Input
                name="shortBio"
                className={`lg:w-[54rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
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
      </div>
      <div className="lg:mt-[4.8rem] md:mt-[2rem] sm:mt-[2rem] lg:w-full md:w-[32.7rem] sm:w-[32.7rem]">
        <div className="flex flex-col border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t mb-[1.6rem]">
            상세 설명 <span className="text-blue-300">*</span>
          </h3>
          <textarea
            value={values.description}
            name="description"
            onChange={handleChange}
            placeholder="상세 내용을 입력해 주세요"
            onBlur={() => handleInputBlur('description')}
            className={`lg:w-[54rem] lg:h-[16rem] md:w-[32.7rem] md:h-[16rem] sm:w-[32.7rem] sm:h-[16rem] rounded-[1.6rem] px-[2.4rem] py-[1.4rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-normal ${
              errors.description && isTouched.description ? 'bg-white border-red-200 border' : 'bg-background-200'
            } text-black-400 placeholder-gray-300 resize-none focus:outline-none`}
          ></textarea>
          {errors.description && isTouched.description && (
            <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-red-200 mt-[0.8rem] self-start">
              {errors.description}
            </span>
          )}
        </div>
        <div className="border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
          <h3
            className={`lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t ${
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
            className={`lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 dark:text-dark-t ${
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
        <ButtonWrapper id="profile-register-driver" type="submit" onClick={handleUserDataSubmit}>
          <ButtonWrapper.Button
            disabled={!isDisabled}
            className="lg:w-[54rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-center text-white font-semibold lg:mb-[10.4rem] md:mb-[4rem] sm:mb-[4rem]"
          >
            시작하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </div>
  );
}
