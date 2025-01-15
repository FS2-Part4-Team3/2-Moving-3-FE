'use client';

import { ButtonWrapper } from '@/components/common/headless/Button';

export default function MyQuoteEditClient() {
  return (
    <div className="w-full flex items-center lg:gap-[1.1rem]">
      <ButtonWrapper id="edit-quotation">
        <ButtonWrapper.Button className="w-full h-[6.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold text-[2rem] leading-[3.2rem] text-white">
          견적서 수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="delete-quotation">
        <ButtonWrapper.Button className="w-full h-[6.4rem] rounded-[1.6rem] py-[1.6rem] px-[2.4rem] border border-blue-300 bg-white font-semibold text-[2rem] leading-[3.2rem] text-blue-300">
          견적서 삭제하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
