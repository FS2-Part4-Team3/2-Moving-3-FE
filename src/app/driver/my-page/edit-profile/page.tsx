import profile from '@/../public/assets/profile/img_profile_upload.svg';
import ProfileEditDriver from '@/pages/ProfileEditDriver';

export default function ProfileEditForDriverPage() {
  // 예시 데이터
  const values = {
    nickname: '김코드',
    career: 10,
    shortBio: '김코드의 한 줄 소개입니다.',
    description: '김코드의 상세 설명입니다.',
    selectedRegion: '소형이사',
    selectedMovingType: '서울',
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[135.2rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col lg:items-start md:items-center sm:items-center lg:mt-[3.2rem] md:mt-[1.6rem] sm:mt-[1.6rem]">
        <h1 className="lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:font-semibold md:font-bold sm:font-bold text-black-400">
          프로필 수정
        </h1>
      </div>
      <div className="lg:w-[135.2rem] h-[0.1rem] bg-line-100 lg:my-[4rem] "></div>
      <ProfileEditDriver values={values} imgUrl={profile} />
    </div>
  );
}
