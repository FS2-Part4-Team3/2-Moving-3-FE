import ProfileRegisterDriver from "@/pages/ProfileRegisterDriver";

export default function ProfileRegisterDriverPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[135.2rem] mt-[6rem] border-b border-line-100 pb-[4.8rem] ">
        <h1 className="text-[3.2rem] font-semibold text-black-400 mb-[3.2rem]">
          기사님 프로필 등록
        </h1>
        <h3 className="text-[2rem] font-normal text-black-200">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </h3>
      </div>
      <div>
        <ProfileRegisterDriver />
      </div>
    </div>
  );
}
