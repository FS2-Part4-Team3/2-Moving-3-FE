'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import heart_black from '@/../../public/assets/driver/ic_like.svg';
import heart_red from '@/../../public/assets/driver/ic_like_on.svg';
import { ButtonWrapper } from '@/components/common/headless/Button';
import SpecifiedQuotationFailureModal from '@/components/modal/SpecifiedQuotationFailureModal';

type DetailButtonClientProps = {
  type?: 'quoteWaiting' | 'quoteReceived';
};

export default function DetailButtonClient({ type }: DetailButtonClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const router = useRouter();

  const handleFavorite = () => {
    // [비회원]
    // 로그인 페이지로 이동
    // [normal]
    // 좋아요 이미지 변경
    // 찜하기 api 연결
    // 다시 누르면 둘다 취소
  };

  const handleRequest = () => {
    if (isCompleted) return;
    try {
      if (type === 'quoteWaiting') {
        // 견적 확정하기 API 연결 예시
        handleConfirmQuote('quote-1');
      } else {
        // [비회원]
        // 로그인 페이지로 이동
        // [normal]
        // 만약 견적이 있다면, 지정 견적 요청 Api 연결 (post)
        // 만약 견적이 없다면, Modal open
        setIsModalOpen(true);
      }
      setIsCompleted(true);
    } catch (err) {
      alert('요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmQuote = async (quoteId: string) => {
    // await confirmQuote(quoteId);
    alert('견적이 확정되었습니다.');
  };

  return (
    <>
      <ButtonWrapper id="favorite-driver" onClick={handleFavorite}>
        <ButtonWrapper.Button className="lg:w-full h-[5.4rem] sm:w-[5.4rem] rounded-[1.6rem] p-[1rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black bg-white border border-line-200">
          <div className="flex flex-row gap-[1rem] items-center justify-center">
            <Image src={heart_black} alt="heart" width={24} height={24} />
            <p className="lg:block sm:hidden">기사님 찜하기</p>
          </div>
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="request-designated-quote" onClick={handleRequest}>
        <ButtonWrapper.Button
          className="w-full lg:h-[6.4rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white"
          disabled={isCompleted}
        >
          {type === 'quoteWaiting' ? '견적 확정하기' : '지정 견적 요청하기'}
        </ButtonWrapper.Button>
      </ButtonWrapper>
      {isModalOpen && <SpecifiedQuotationFailureModal onClose={handleCloseModal} />}
    </>
  );
}
