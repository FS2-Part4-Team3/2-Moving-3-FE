'use client';

import { useState } from 'react';
import { ButtonWrapper } from '@/components/common/headless/Button';
import MyQuoteEditToast from '@/components/toasts/MyQuoteEditToast';

export default function MyQuoteEditClient() {
  //TODO: 기사님 정보가 있는 경우 없는 경우 나눠서 토스트 보여줄지 확정하기 라우팅 시켜줄지 결정하기
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div className="w-full flex items-center lg:gap-[1.1rem] sm:gap-[1.6rem] md:flex-row sm:flex-col">
        <ButtonWrapper id="edit-quotation">
          <ButtonWrapper.Button
            className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] p-[1.6rem] flex items-center justify-center font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-white"
            onClick={handleShowToast}
          >
            견적서 수정하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="delete-quotation">
          <ButtonWrapper.Button className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] py-[1.6rem] px-[2.4rem] flex items-center justify-center border border-blue-300 bg-white font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-blue-300">
            견적서 삭제하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
      {showToast && <MyQuoteEditToast onClose={handleCloseToast} />}
    </>
  );
}
