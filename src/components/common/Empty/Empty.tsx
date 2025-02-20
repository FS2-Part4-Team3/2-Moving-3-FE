'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import folder from '@/../public/assets/common/empty/empty_folder_img.svg';
import profile from '@/../public/assets/common/empty/empty_profile_img.svg';
import truck from '@/../public/assets/common/empty/empty_truck_img.svg';
import type { EmptyProps } from '@/interfaces/CommonComp/EmptyInterface';
import { ButtonWrapper } from '../headless/Button';

export default function Empty({ type }: EmptyProps) {
  const router = useRouter();
  let image;
  let text;
  let text2;
  let buttonText;
  let link; // TODO: 버튼이 있는 경우 라우팅 해야할 주소 입력 용도

  switch (type) {
    case 'Profile':
      image = profile;
      text = '아직 등록된 프로필이 없어요!';
      text2 = '프로필을 등록하고 요청을 받아보세요';
      buttonText = '프로필 등록하기';
      break;
    case 'WaitingQuote':
      image = folder;
      text = '아직 받은 요청이 없어요!';
      text2 = '';
      buttonText = '';
      break;
    case 'ReceivedQuote':
      image = folder;
      text = '완료된 견적이 없어요!';
      text2 = '';
      buttonText = '';
      break;
    case 'Review':
      image = folder;
      text = '아직 등록된 리뷰가 없어요!';
      text2 = '';
      buttonText = '리뷰 작성하러 가기';
      link = () => router.push('/normal/my-page/writable-review');
      break;
    case 'ReviewAble':
      image = folder;
      text = '작성 가능한 리뷰가 없어요!';
      text2 = '';
      buttonText = '';
      break;
    case 'Driver':
      image = folder;
      text = '아직 등록된 리뷰가 없어요!';
      text2 = '';
      buttonText = '';
      break;
    case 'RequestQuote':
      image = truck;
      text = '현재 진행 중인 이사 견적이 있어요!';
      text2 = '진행중인 이사 완료 후 새로운 견적을 받아보세요.';
      buttonText = '받은 견적 보러가기';
      link = () => router.push('/normal/my-quote/waiting');
      break;
    case 'RequestEmpty':
      image = truck;
      text = '현재 진행 중인 이사 견적이 없어요!';
      text2 = '이사 견적 등록 후 이용해주세요.';
      buttonText = '견적 요청하기';
      link = () => router.push('/normal/request-quote');
      break;
    case 'SendQuote':
      image = folder;
      text = '보낸 견적이 없어요!';
      text2 = '고객님께 견적을 보낸 후 이용해주세요.';
      buttonText = '견적 보내러 가기';
      link = () => router.push('/driver/receive-quote');
      break;
    case 'RejectQuote':
      image = folder;
      text = '반려한 요청이 없어요!';
      text2 = '지정 견적 요청을 반려한 후에 이용해주세요.';
      buttonText = '';
      break;
  }

  return (
    <div className="flex flex-col gap-[3.2rem] items-center">
      {type === 'RequestQuote' || type === 'RequestEmpty' ? (
        <>
          <Image src={image} alt="empty" width={378} height={140} className="lg:block sm:hidden" />
          <Image src={image} alt="empty" width={228} height={96} className="lg:hidden sm:block" />
        </>
      ) : (
        <>
          <Image src={image} alt="empty" width={184} height={136} className="lg:block sm:hidden" />
          <Image src={image} alt="empty" width={110} height={82} className="lg:hidden sm:block" />
        </>
      )}
      <div className="flex flex-col items-center font-normal lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-gray-400 text-nowrap ">
        <p>{text}</p>
        {text2 && <p>{text2}</p>}
      </div>
      {buttonText && (
        <ButtonWrapper id="empty-button" onClick={link}>
          <ButtonWrapper.Button className="lg:h-[6.5rem] sm:h-[5.4rem] lg:p-[1.6rem] sm:py-[1.6rem] sm:px-[2.4rem] rounded-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white">
            {buttonText}
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
    </div>
  );
}
