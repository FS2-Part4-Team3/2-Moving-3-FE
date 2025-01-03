import arrow_down from "@/../public/assets/common/dropdown/chevron-down.svg";
import Image from "next/image";

export default function RegionServiceDropdown() {
  return (
    <div className="w-[32.8rem] flex flex-col gap-[3.2rem]">
      <div className="border-b border-line-200 py-[1.6rem] px-[1rem] flex justify-between items-center">
        <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
          필터
        </p>
        <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">
          초기화
        </p>
      </div>
      <div className="flex flex-col gap-[1.6rem]">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400">
          지역을 선택해주세요
        </p>
        <div className="w-full h-[6.4rem] rounded-[1.6rem] border border-gray-100 py-[1.6rem] px-[2.4rem] flex items-center justify-between">
          <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
            지역
          </p>
          <Image src={arrow_down} alt="arrow" width={36} height={36} />
        </div>
      </div>
      <div className="flex flex-col gap-[1.6rem]">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400">
          어떤 서비스가 필요하세요?
        </p>
        <div className="w-full h-[6.4rem] rounded-[1.6rem] border border-gray-100 py-[1.6rem] px-[2.4rem] flex items-center justify-between">
          <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
            서비스
          </p>
          <Image src={arrow_down} alt="arrow" width={36} height={36} />
        </div>
      </div>
    </div>
  );
}
