import InfoEditForDriver from '@/pages/InfoEditForDiver';

export default function InfoEditForDriverPage() {
  return (
    <div className="flex flex-col items-center lg:gap-[4rem] lg:pt-[7.2rem]">
      <div className="lg:w-[135.2rem]">
        <h1 className="lg:text-[3.2rem] font-semibold text-black-400">기본정보 수정</h1>
      </div>
      <div className="w-[135.2rem] h-[0.1rem] bg-line-100"></div>
      <div>
        <InfoEditForDriver />
      </div>
    </div>
  );
}
