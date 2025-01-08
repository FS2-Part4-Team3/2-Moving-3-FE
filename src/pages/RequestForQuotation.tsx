"use client";

import MovingTypeCheckCard from "@/components/cards/MovingTypeCheckCard";

export default function RequestForQuotation() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white py-[3.2rem] flex flex-col gap-[2.4rem] ">
        <h1 className="text-[2.4rem] font-semibold text-black-600">견적요청</h1>
        <div className="w-[140rem] h-[0.8rem] rounded-[3rem] bg-line-200">
          <div className="w-[35rem] h-[0.8rem] rounded-[3rem] bg-blue-300"></div>
        </div>
      </div>
      <div className="w-full h-full bg-background-200 px-[26rem] pt-[4rem] flex flex-col items-center">
        <div className="w-[140rem] flex flex-col gap-[2.4rem]">
          <div className="max-w-[52rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400">
            몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)
          </div>
          <div className="max-w-[27rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400">
            이사 종류를 선택해 주세요.
          </div>
        </div>
        <div className="self-end">
          <MovingTypeCheckCard />
        </div>
      </div>
    </div>
  );
}
