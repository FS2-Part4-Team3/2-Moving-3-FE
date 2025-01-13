import ProfileEditNormal from '@/pages/ProfileEditNormal';

export default function ProfileEditForNormalPage() {
  return (
    <div className="flex flex-col items-center lg:gap-[4rem] lg:mt-[3.2rem]">
      <div className="lg:w-[120rem] lg:h-[3.2rem] lg:text-[3.2rem] font-semibold text-black-400 ">프로필 수정</div>
      <div className="lg:w-[120rem] h-[0.2rem] bg-line-100"></div>
      <div>
        <ProfileEditNormal />
      </div>
    </div>
  );
}
