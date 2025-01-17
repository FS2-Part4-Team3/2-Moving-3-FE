'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import profile from '@/../public/assets/profile/img_profile_upload.svg';
import { patchUserData, putImage } from '@/api/UserService';
import { ProfileChips } from '@/components/chips/ProfileChips';
import { ButtonWrapper } from '@/components/common/headless/Button';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';

export default function ProfileRegisterNormal() {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedMovingType, setSelectedMovingType] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

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

  const userMutation = useMutation({
    mutationFn: async () => {
      let sampleImage = '';
      if (selectedImg) {
        sampleImage = selectedImg.name;
      }
      const res = await patchUserData(sampleImage, selectedMovingType, selectedRegions);
      const { uploadUrl } = res;

      if (selectedImg === null) return;
      const image = await putImage(uploadUrl, selectedImg);
      return await patchUserData(image, selectedMovingType, selectedRegions);
    },
    onSuccess: () => {
      router.push('/normal/match-driver');
    },
    onError: () => {
      // router.push('/not-found');
    },
  });

  const handleSubmit = () => {
    userMutation.mutate();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b border-line-100 pb-[3.2rem]">
        <h1 className="lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] font-semibold text-black-400 mb-[3.2rem] mt-[2.4rem]">
          프로필 등록
        </h1>
        <h3 className="lg:text-[2rem] md:text-[1.2rem] sm:text-[1.2rem] font-normal text-black-200">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </h3>
      </div>
      <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] mt-[6.4rem]">
        <div className="flex flex-col border-b border-line-100 pb-[3.2rem]">
          <h2 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-black-300 mb-[2.4rem]">
            프로필 이미지
          </h2>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
          <button onClick={handleImgClick}>
            <div className="relative lg:w-[16rem] lg:h-[16rem] md:w-[10rem] md:h-[10rem] sm:w-[10rem] sm:h-[10rem]">
              <Image src={previewUrl || profile} alt="프로필 등록 이미지" fill className="cursor-pointer" priority />
            </div>
          </button>
        </div>
        <div className="border-b border-line-100 pb-[3.2rem] mt-[3.2rem]">
          <h2 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-black-300 mb-[0.8rem]">
            이용 서비스
          </h2>
          <p className="lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-normal text-gray-400 mb-[3.2rem]">
            *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
          </p>
          <ProfileChips
            movingTypes={movingTypes}
            selectedMovingType={selectedMovingType}
            setSelectedMovingType={setSelectedMovingType}
          />
        </div>
        <div className="mt-[3.2rem]">
          <h2 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-black-300 mb-[0.8rem]">
            내가 사는 지역
          </h2>
          <p className="lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-normal text-gray-400 mb-[3.2rem]">
            *내가 사는 지역은 언제든 수정 가능해요!
          </p>
          <ProfileChips regions={regions} selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} />
        </div>
      </div>
      <ButtonWrapper id="profile-register-normal" onClick={handleSubmit}>
        <ButtonWrapper.Button
          disabled={!selectedMovingType.length || !selectedRegions.length}
          className="lg:w-[64rem] lg:h-[6.4rem] md:w-[32.7rem] md:h-[5.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-center text-white font-semibold mt-[5.6rem] mb-[10.4rem]"
        >
          시작하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
