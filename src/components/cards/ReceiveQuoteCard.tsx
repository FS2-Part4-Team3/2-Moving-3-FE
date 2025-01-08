import type { ReceiveQuoteCardProps } from "@/interfaces/Card/ReceiveQuoteCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";
import { ButtonWrapper } from "../common/headless/Button";
import writing from "@/../public/assets/common/ic_writing.svg";
import Image from "next/image";

export default function ReceiveQuoteCard({ data }: ReceiveQuoteCardProps) {
  return (
    <div className="flex flex-col max-w-[95.5rem] border border-line-100 pt-[2rem] pb-[2.4rem] px-[2.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] rounded-[1.6rem] gap-[1.6rem]">
      <div className="flex w-full justify-between items-center">
        <MovingTypeChips type={data.type} />
        <p className="font-normal text-[1.4rem] leading-[2.4rem] text-gray-500">
          {data.updatedAt}
        </p>
      </div>
      <div className="flex flex-col gap-[1.8rem]">
        <p className="font-semibold text-[2rem] leading-[3.2rem] text-black-300">
          {data.owner} 고객님
        </p>
        <div className="w-full border border-line-200" />
        <div className="flex gap-[1.6rem] items-center">
          <div className="flex gap-[1.2rem] items-center">
            <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
              이사일
            </p>
            <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
              {data.date}
            </p>
          </div>
          <div className="h-[1.6rem] border border-line-200" />
          <div className="flex gap-[1.2rem] items-center">
            <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
              출발
            </p>
            <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
              {data.fromAddress}
            </p>
          </div>
          <div className="h-[1.6rem] border border-line-200" />
          <div className="flex gap-[1.2rem] items-center">
            <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
              도착
            </p>
            <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
              {data.toAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <ButtonWrapper id="send-quote-button">
          <ButtonWrapper.Button className="w-[44.8rem] h-[6.4rem] rounded-[1.6rem] p-[1.6rem] flex items-center justify-center gap-[1rem] font-semibold text-[2rem] leading-[3.2rem] text-white">
            견적 보내기
            <Image src={writing} alt="writing" width={24} height={24} />
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="return-button">
          <ButtonWrapper.Button className="w-[44.8rem] h-[6.4rem] rounded-[1.6rem] p-[1.6rem] flex items-center justify-center py-[1.6rem] px-[2.4rem] border border-blue-300 bg-white text-blue-300 font-semibold text-[2rem] leading-[3.2rem]">
            반려
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </div>
  );
}
