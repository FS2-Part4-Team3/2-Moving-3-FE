import ProfileEditNormal from '@/_pages/ProfileEditNormal';

export default function ProfileEditForNormalPage() {
  return (
    <div className="flex flex-col items-center lg:gap-[4rem] md:gap-[2rem] sm:gap-[2rem] lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
      <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[3.2rem] lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:mb-0 md:mb-[1.2rem] sm:mb-[1.2rem] font-semibold text-black-400 ">
        프로필 수정
      </div>
      <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.2rem] bg-line-100"></div>
      <div>
        <ProfileEditNormal />
      </div>
    </div>
  );
}
