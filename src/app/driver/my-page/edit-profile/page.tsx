import profile from '@/../public/assets/profile/img_profile_upload.svg';
import ProfileEditDriver from '@/_pages/ProfileEditDriver';

export default function ProfileEditForDriverPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col lg:items-start md:items-center sm:items-center lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
        <h1 className="lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:font-semibold md:font-bold sm:font-bold text-black-400">
          프로필 수정
        </h1>
      </div>
      <div className="lg:w-[120rem] h-[0.1rem] bg-line-100 lg:my-[4rem] "></div>
      <ProfileEditDriver />
    </div>
  );
}
