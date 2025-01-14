'use client';

import { useEffect, useRef, useState } from 'react';
import { ButtonWrapper } from '@/components/common/headless/Button';
import ProfileEditNormalLeft from '@/components/section/ProfileEditNormalLeft';
import ProfileEditNormalRight from '@/components/section/ProfileEditNormalRight';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import useProfileValidate from '@/hooks/useProfileValidate';

export default function ProfileEditNormal() {
  //TODO: api 연결 후 유저 값 받아와서 초기값으로 넘겨주기
  const { values, setValues, errors, validate, handleChange } = useProfileValidate();
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
  const [isFormValid, setIsFormValid] = useState(false);
  const isDisabled = isFormValid && previewUrl;

  useEffect(() => {
    setIsFormValid(validate('EDIT'));
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

  const handleValuesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //toDo: 추후에 api 연결
    e.preventDefault();
  };
  return (
    <form
      className="lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center lg:w-[120rem] md:w-[37.5rem] sm:w-[37.5rem] lg:gap-x-[22rem]"
      onSubmit={handleValuesSubmit}
    >
      <div>
        <ProfileEditNormalLeft
          values={values}
          errors={errors}
          isTouched={isTouched}
          handleChange={handleChange}
          handleInputBlur={handleInputBlur}
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
            selectedRegion: values.selectedRegion,
            selectedMovingType: values.selectedMovingType,
            setSelectedRegion: value => setValues(prev => ({ ...prev, selectedRegion: value })),
            setSelectedMovingType: value => setValues(prev => ({ ...prev, selectedMovingType: value })),
            setSelectedRegions: value => setValues(prev => ({ ...prev, selectedRegions: value })),
          }}
        />
      </div>
      <ButtonWrapper id="cancel-btn">
        <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[66rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-0 md:mb-[2.4rem] sm:mb-[2.4rem] ">
          취소
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="fix-btn">
        <ButtonWrapper.Button
          disabled={!isDisabled}
          className="lg:order-2 md:order-1 sm:order-1 lg:w-[66rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-center text-white lg:mb-[15rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
        >
          수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </form>
  );
}
