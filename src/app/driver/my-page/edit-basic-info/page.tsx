import InfoEditForDriver from '@/pages/InfoEditForDiver';

export default function InfoEditForDriverPage() {
  // 예시 데이터
  const values = {
    name: '김코드',
    email: 'codeit@codeit.com',
    number: '01012345678',
  };
  return (
    <div className="flex flex-col items-center lg:gap-[4rem] md:gap-[1.6rem] sm:gap-[1.6rem] lg:pt-[7.2rem] md:pt-[1.6rem] sm:pt-[1.6rem]">
      <div className="lg:w-[135.2rem] md:w-[32.7rem] sm:w-[32.7rem]">
        <h1 className="lg:text-[3.2rem] md:text-[1.8rem] sm:text-[1.8rem] font-semibold text-black-400">기본정보 수정</h1>
      </div>
      <div className="lg:w-[135.2rem] md:w-[32.7rem] sm:w-[32.7rem] h-[0.1rem] bg-line-100"></div>
      <div>
        <InfoEditForDriver values={values} />
      </div>
    </div>
  );
}
