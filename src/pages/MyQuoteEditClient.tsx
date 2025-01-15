'use client';

import { ButtonWrapper } from '@/components/common/headless/Button';

export default function MyQuoteEditClient() {
  return (
    <div className="w-full flex items-center lg:gap-[1.1rem] sm:gap-[1.6rem] md:flex-row sm:flex-col">
      <ButtonWrapper id="edit-quotation">
        <ButtonWrapper.Button className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] p-[1.6rem] flex items-center justify-center font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-white">
          견적서 수정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="delete-quotation">
        <ButtonWrapper.Button className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] py-[1.6rem] px-[2.4rem] flex items-center justify-center border border-blue-300 bg-white font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-blue-300">
          견적서 삭제하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
