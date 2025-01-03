"use client";

import Image from "next/image";
import profile from "@/../public/assets/profile/img_profile_upload.svg";
import { ProfileChips } from "@/components/chips/ProfileChips";
import movingTypes from "@/constants/movingType";
import regions from "@/constants/regions";
import { ButtonWrapper } from "@/components/common/headless/Button";
import { useRef, useState } from "react";

export default function ProfileRegisterNormal() {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPrviewUrl] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMovingType, setSelectedMovingType] = useState<string | null>(
    null
  );
  //toDo: const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
      setPrviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgSubmit = () => {
    if (selectedImg) return;
    //toDo: api post 요청 삽입
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-[64rem] border-b border-gray-600 pb-[3.2rem]">
        <h1 className="text-[3.2rem] font-semibold text-black-400 mb-[3.2rem] mt-[2.4rem]">
          프로필 등록
        </h1>
        <h3 className="text-[2rem] font-normal text-black-200">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </h3>
      </div>
      <div className="lg:w-[64rem] mt-[6.4rem]">
        <div className="flex flex-col border-b border-gray-600 pb-[3.2rem]">
          <h2 className="text-[2rem] font-semibold text-black-300 mb-[2.4rem]">
            프로필 이미지
          </h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImgChange}
          />
          <button onClick={handleImgClick}>
            <Image
              src={previewUrl || profile}
              alt="프로필 등록 이미지"
              width={160}
              height={160}
              className="cursor-pointer"
            />
          </button>
        </div>
        <div className="border-b border-gray-600 pb-[3.2rem] mt-[3.2rem]">
          <h2 className="text-[2rem] font-semibold text-black-300 mb-[0.8rem]">
            이용 서비스
          </h2>
          <p className="text-[1.6rem] font-normal text-gray-400 mb-[3.2rem]">
            *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
          </p>
          <ProfileChips
            movingTypes={movingTypes}
            selectedMovingType={selectedMovingType}
            setSelectedMovingType={setSelectedMovingType}
          />
        </div>
        <div className="mt-[3.2rem]">
          <h2 className="text-[2rem] font-semibold text-black-300 mb-[0.8rem]">
            내가 사는 지역
          </h2>
          <p className="text-[1.6rem] font-normal text-gray-400 mb-[3.2rem]">
            *내가 사는 지역은 언제든 수정 가능해요!
          </p>
          <ProfileChips
            regions={regions}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
      </div>
      <ButtonWrapper id="profile-register-normal" onClick={handleImgSubmit}>
        <ButtonWrapper.Button
          disabled={!(selectedImg && selectedMovingType && selectedMovingType)}
          className="w-[64rem] h-[6.4rem] rounded-[1.6rem] text-[2rem] text-center text-white font-semibold mt-[5.6rem] mb-[10.4rem]"
        >
          시작하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
