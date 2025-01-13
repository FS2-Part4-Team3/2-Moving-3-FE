'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import heart_black from '@/../../public/assets/driver/ic_like.svg';
import heart_red from '@/../../public/assets/driver/ic_like_on.svg';
import { ButtonWrapper } from '@/components/common/headless/Button';

export default function DriverDetailButtonClient() {
  const router = useRouter();

  const handleFavorite = () => {
    // 좋아요 이미지 변경
    // 찜하기 api 연결
    // 다시 누르면 둘다 취소
  };

  const handleRequest = () => {
    // 만약 견적이 있다면, 지정 견적 요청 Api 연결 (post)
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
        <ButtonWrapper.Button className="w-full lg:h-[6.4rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white">
          지정 견적 요청하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </>
  );
}
