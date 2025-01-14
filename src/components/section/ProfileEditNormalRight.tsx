import Image from 'next/image';
import profile from '@/../public/assets/profile/img_profile_upload.svg';
import type { ProfileEditNormlRightProps } from '@/interfaces/Page/ProfileEditNormal';
import { ProfileChips } from '../chips/ProfileChips';

export default function ProfileEditNormalRight({
  handleImgChange,
  handleImgClick,
  previewUrl,
  fileInputRef,
  chipProps,
}: ProfileEditNormlRightProps) {
  return (
    <div>
      <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] border-line-100 lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem]">
        <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[2.4rem]">
          프로필 이미지
        </h3>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
        <button onClick={handleImgClick}>
          <div className="relative lg:w-[16rem] lg:h-[16rem] md:w-[10rem] md:h-[10rem] sm:w-[10rem] sm:h-[10rem]">
            <Image src={previewUrl || profile} alt="프로필 등록 이미지" fill className="cursor-pointer" priority />
          </div>
        </button>
      </div>
      <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] border-b lg:pb-[3.2rem] md:pb-[2rem] sm:pb-[2rem] lg:mb-[3.2rem] md:mb-[2rem] sm:mb-[2rem] border-line-100">
        <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[0.8rem] ">
          이용 서비스 <span className="text-blue-300">*</span>
        </h3>
        <span className="lg:text-[1.6rem] sm:text-[1.3rem] text-[1.3rem] font-medium text-gray-400 mt-[0.2rem] mb-[3.2rem] self-end block">
          * 견적 요청 시 이용 서비스를 선택할 수 있어요.
        </span>
        <ProfileChips
          movingTypes={chipProps.movingTypes}
          selectedMovingType={chipProps.selectedMovingType}
          setSelectedMovingType={chipProps.setSelectedMovingType}
        />
      </div>
      <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] lg:mb-[6.8rem] md:mb-[2.4rem] sm:mb-[2.4rem]">
        <h3 className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold lg:text-black-300 mb-[0.8rem]">
          서비스 가능 지역 <span className="text-blue-300">*</span>
        </h3>
        <span className="lg:text-[1.6rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-gray-400 mt-[0.2rem] mb-[3.2rem] self-end block">
          * 견적 요청 시 지역을 설정할 수 있어요.
        </span>
        <ProfileChips
          regions={chipProps.regions}
          selectedRegion={chipProps.selectedRegion}
          setSelectedRegion={chipProps.setSelectedRegion}
        />
      </div>
    </div>
  );
}
