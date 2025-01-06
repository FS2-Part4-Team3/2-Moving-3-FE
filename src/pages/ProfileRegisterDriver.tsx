"use client";

import Image from "next/image";
import profile from "@/../public/assets/profile/img_profile_upload.svg";
import { useEffect, useRef, useState } from "react";
import { InputWrapper } from "@/components/common/headless/Input";
import { ProfileChips } from "@/components/chips/ProfileChips";
import movingTypes from "@/constants/movingType";
import regions from "@/constants/regions";
import { ButtonWrapper } from "@/components/common/headless/Button";
import useProfileDriverValidate from "@/hooks/useProfileDriverValidate";

export default function ProfileRegisterDriver() {
  const { values, setValues, errors, validate, handleChange } =
    useProfileDriverValidate();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTouched, setIsTouched] = useState({
    nickname: false,
    carrer: false,
    shortBio: false,
    description: false,
    selectedRegion: false,
    selectedMovingType: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const isDisabled = isFormValid && previewUrl;
  //toDo: 추후에 user 정보 받아서 중복 선택 가능하게 하기

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
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleValuesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //toDo: 추후에 api 연결
    e.preventDefault();
    if (validate()) {
    } else {
    }
    return;
  };

  return (
    <form
      className="lg:w-[135.2rem] grid grid-cols-2 gap-[7.2rem]"
      onSubmit={handleValuesSubmit}
    >
      <div className="mt-[4.8rem]">
        <div className="border-b pb-[3.2rem] border-line-100 mb-[3.2rem]">
          <h3 className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            프로필 이미지
          </h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgChange}
          />
          <button onClick={handleImgClick}>
            <div className="relative lg:w-[16rem] lg:h-[16rem] md:w-[10rem] md:h-[10rem] sm:w-[10rem] sm:h-[10rem]">
              <Image
                src={previewUrl || profile}
                alt="프로필 등록 이미지"
                fill
                className="cursor-pointer"
                priority
              />
            </div>
          </button>
        </div>
        <div className="border-b pb-[3.2rem] border-line-100 mb-[3.2rem]">
          <InputWrapper
            id="nickname"
            type="text"
            value={values.nickname}
            onChange={handleChange}
          >
            <div className="flex flex-col">
              <InputWrapper.Label className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                별명 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <InputWrapper.Input
                name="nickname"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.nickname && isTouched.nickname
                    ? "bg-white border-red-200 border"
                    : "bg-background-200"
                } text-[2rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="사이트에 노출될 이름을 입력해 주세요"
                onBlur={() => handleInputBlur("nickname")}
              />
              {errors.nickname && isTouched.nickname && (
                <span className="text-[1.6rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.nickname}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div className="border-b pb-[3.2rem] border-line-100 mb-[3.2rem]">
          <InputWrapper
            id="carrer"
            type="text"
            value={values.carrer}
            onChange={handleChange}
          >
            <div className="flex flex-col">
              <InputWrapper.Label className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                경력 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <InputWrapper.Input
                name="carrer"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.carrer && isTouched.carrer
                    ? "bg-white border-red-200 border"
                    : "bg-background-200"
                } text-[2rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="기사님의 경력을 입력해 주세요"
                onBlur={() => handleInputBlur("carrer")}
              />
              {errors.carrer && isTouched.carrer && (
                <span className="text-[1.6rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.carrer}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
        <div>
          <InputWrapper
            id="shortBio"
            type="text"
            value={values.shortBio}
            onChange={handleChange}
          >
            <div className="flex flex-col">
              <InputWrapper.Label className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
                한 줄 소개 <span className="text-blue-300">*</span>
              </InputWrapper.Label>
              <InputWrapper.Input
                name="shortBio"
                className={`lg:w-[64rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] ${
                  errors.shortBio && isTouched.shortBio
                    ? "bg-white border-red-200 border"
                    : "bg-background-200"
                } text-[2rem] font-normal text-black-400 placeholder-gray-300 focus:outline-none`}
                placeholder="한 줄 소개를 입력해 주세요"
                onBlur={() => handleInputBlur("shortBio")}
              />
              {errors.shortBio && isTouched.shortBio && (
                <span className="text-[1.6rem] font-medium text-red-200 mt-[0.8rem] self-end">
                  {errors.shortBio}
                </span>
              )}
            </div>
          </InputWrapper>
        </div>
      </div>
      <div className="mt-[4.8rem]">
        <div className="border-b pb-[3.2rem] border-line-100 mb-[3.2rem]">
          <h3 className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            상세 설명 <span className="text-blue-300">*</span>
          </h3>
          <textarea
            value={values.description}
            name="description"
            onChange={handleChange}
            placeholder="상세 내용을 입력해 주세요"
            onBlur={() => handleInputBlur("description")}
            className={`w-[64rem] h-[16rem] rounded-[1.6rem] px-[2.4rem] py-[1.4rem] text-[2rem] font-normal ${
              errors.description && isTouched.description
                ? "bg-white border-red-200 border"
                : "bg-background-200"
            } text-black-400 placeholder-gray-300 resize-none focus:outline-none`}
          ></textarea>
          {errors.description && isTouched.description && (
            <span className="text-[1.6rem] font-medium text-red-200 mt-[0.8rem] self-end">
              {errors.description}
            </span>
          )}
        </div>
        <div className="border-b pb-[3.2rem] border-line-100 mb-[3.2rem]">
          <h3 className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            제공 서비스 <span className="text-blue-300">*</span>
          </h3>
          <ProfileChips
            movingTypes={movingTypes}
            selectedMovingType={values.selectedMovingType}
            setSelectedMovingType={(value) =>
              setValues((prev) => ({ ...prev, selectedMovingType: value }))
            }
          />
        </div>
        <div className="mb-[6.8rem]">
          <h3 className="text-[2rem] font-semibold lg:text-black-300 mb-[1.6rem]">
            서비스 가능 지역 <span className="text-blue-300">*</span>
          </h3>
          <ProfileChips
            regions={regions}
            selectedRegion={values.selectedRegion}
            setSelectedRegion={(value) =>
              setValues((prev) => ({ ...prev, selectedRegion: value }))
            }
          />
        </div>
        <ButtonWrapper id="profile-register-driver" type="submit">
          <ButtonWrapper.Button
            disabled={!isDisabled}
            className="lg:w-[64rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-center text-white font-semibold mt-[5.6rem] mb-[10.4rem]"
          >
            시작하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </form>
  );
}
