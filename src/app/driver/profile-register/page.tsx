import ProfileRegisterDriver from '@/_pages/ProfileRegisterDriver';

export default function ProfileRegisterDriverPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[135.2rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col lg:items-start md:items-center sm:items-center lg:mt-[6rem] md:mt-[1.6rem] sm:mt-[1.6rem] border-b border-line-100 lg:pb-[4.8rem] md:pb-[2.4rem] sm:pb-[2.4rem]">
        <h1 className="lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] lg:font-semibold md:font-bold sm:font-bold text-black-400 lg:mb-[3.2rem] md:mb-[1.6rem] md:self-start sm:mb-[1.6rem] sm:self-start">
          기사님 프로필 등록
        </h1>
        <h3 className="lg:text-[2rem] md:text-[1.2rem] sm:text-[1.2rem] font-normal text-black-200 md:self-start sm:self-start">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </h3>
      </div>
      <ProfileRegisterDriver />
    </div>
  );
}
