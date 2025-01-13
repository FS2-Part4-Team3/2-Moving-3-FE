'use client';

import { useEffect, useRef, useState } from 'react';
import { InputWrapper } from '@/components/common/headless/Input';
import ProfileEditNormalLeft from '@/components/section/ProfileEditNormalLeft';
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
    setIsFormValid(validate());
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
    <form className="grid grid-cols-2 lg:w-[120rem] lg:gap-[7.2rem]">
      <ProfileEditNormalLeft
        values={values}
        errors={errors}
        isTouched={isTouched}
        handleChange={handleChange}
        handleInputBlur={handleInputBlur}
      />
      <div></div>
    </form>
  );
}
