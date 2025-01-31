'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData, getUserData, patchPassword, putImage } from '@/api/UserService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import ProfileEditNormalLeft from '@/components/section/ProfileEditNormalLeft';
import ProfileEditNormalRight from '@/components/section/ProfileEditNormalRight';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import useProfileValidate from '@/hooks/useProfileValidate';
import { setProfile, setProfileNoImg, setUserSign } from '@/store/slices/SignInSlice';
import { RootState } from '@/store/store';

export default function ProfileEditNormal() {
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
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);
  const disabled = values.name && values.number && values.nowPassword && values.selectedMovingType && values.selectedRegions;
  const dispatch = useDispatch();

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
      number: user.phoneNumber || '',
      selectedRegions: user.areas || [],
      selectedMovingType: user.serviceType || [],
    }));
    setPreviewUrl(user.image || '');
  }, []);

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
      const { uploadUrl } = response;

      dispatch(
        setProfileNoImg({
          serviceType: response.serviceType,
          areas: response.areas,
        }),
        setUserSign({
          name: response.name,
          phoneNumber: response.phoneNumber,
        }),
      );

      if (selectedImg === null) return;

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
        setUserSign({
          name: response.name,
          phoneNumber: response.phoneNumber,
        }),
      );
    },
    onSuccess: () => {
      router.push('/normal/match-driver');
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async () => {
      await patchPassword(values.nowPassword, values.newPassword);
    },
  });

  const handleValuesSubmit = () => {
    userMutation.mutate();
    if (values?.newPassword.length) {
      passwordMutation.mutate();
    }
  };
  return (
    <div className="lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center lg:w-[120rem] md:w-[37.5rem] sm:w-[37.5rem] lg:gap-x-[12rem]">
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
        <ButtonWrapper.Button className="lg:order-1 md:order-2 sm:order-2 lg:w-[54rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] border border-gray-200 bg-white shadow-custom6 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem]  font-semibold text-center text-gray-300 lg:mb-[15rem] md:mb-[2.4rem] sm:mb-[2.4rem] ">
          취소
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="fix-btn" onClick={handleValuesSubmit}>
        <ButtonWrapper.Button
          disabled={!disabled}
          className="lg:order-2 md:order-1 sm:order-1 lg:w-[54rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] px-[2.4rem] py-[1.6rem] bg-blue-300 lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-center text-white lg:mb-[15rem] md:mb-[0.8rem] sm:mb-[0.8rem]"
        >
          수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
