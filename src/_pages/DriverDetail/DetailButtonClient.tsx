'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import edit_white from '@/../../public/assets/common/ic_writing.svg';
import edit_gray from '@/../../public/assets/common/ic_writing_gray.svg';
import heart_black from '@/../../public/assets/driver/ic_like.svg';
import heart_red from '@/../../public/assets/driver/ic_like_on.svg';
import { delDibDriver, getDibDriver, postDibDriver } from '@/api/DriverService';
import { getCheckRequestDriver, postRequestDriver } from '@/api/MovesService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import SpecifiedQuotationFailureModal from '@/components/modal/SpecifiedQuotationFailureModal';
import type { DetailButtonClientProps } from '@/interfaces/Page/DriverDetailInterface';
import { RootState } from '@/store/store';

export default function DetailButtonClient({ type, id }: DetailButtonClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCheckDib, setIsCheckDib] = useState(false);

  const userType = useSelector((state: RootState) => state.signIn.type);
  const moveInfoId = useSelector((state: RootState) => state.myQuotation.id);

  const router = useRouter();

  useEffect(() => {
    if (userType === 'user') {
      const fetchDibStatus = async () => {
        try {
          const res = await getDibDriver(id);
          setIsCheckDib(res);
        } catch (err) {
          console.error('찜 상태를 가져오는 데 실패했습니다: ', err);
        }
      };

      const fetchRequestStatus = async () => {
        try {
          const res = await getCheckRequestDriver(id);
          setIsCompleted(!res.isRequestPossible);
        } catch (err) {
          console.error('요청 상태를 가져오는 데 실패했씁니다: ', err);
        }
      };

      if (!type || type === 'quoteWaiting' || type === 'quoteReceived') {
        fetchDibStatus();
      }
      if (!type) {
        fetchRequestStatus();
      }
    }
  }, [id]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (isAdding: boolean) => {
      if (isAdding) {
        return await postDibDriver(id);
      } else {
        return await delDibDriver(id);
      }
    },
    onSuccess: () => {
      setIsCheckDib(prev => !prev);
    },
    onError: err => {
      console.error('찜하기 처리 중 오류가 발생했습니다:', err);
      alert('찜하기 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleFavorite = async () => {
    if (!userType) {
      router.push('/normal/sign-in');
      return;
    }

    toggleFavoriteMutation.mutate(!isCheckDib);
  };

  const handleRequest = async () => {
    if (isCompleted) return;
    if (!userType) {
      router.push('/normal/sign-in');
      return;
    }
    try {
      if (type === 'quoteWaiting') {
        // 견적 확정하기 API 연결 예시
        await handleConfirmQuote('quote-1');
      } else {
        if (!moveInfoId) {
          setIsModalOpen(true);
          return;
        } else {
          await postRequestDriver(id);
        }
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

  const handleEditProfile = () => {
    router.push('/driver/my-page/edit-profile');
  };

  const handleEditBasicInfo = () => {
    router.push('/driver/my-page/edit-basic-info');
  };

  return (
    <>
      {(type === 'quoteWaiting' || type === undefined) && (
        <ButtonWrapper id="favorite-driver" onClick={handleFavorite}>
          <ButtonWrapper.Button className="lg:w-full h-[5.4rem] sm:w-[5.4rem] rounded-[1.6rem] p-[1rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black bg-white border border-line-200">
            <div className="flex flex-row gap-[1rem] items-center justify-center">
              <Image src={isCheckDib ? heart_red : heart_black} alt="heart" width={24} height={24} />
              <p className="lg:block sm:hidden">기사님 찜하기</p>
            </div>
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {(type === 'quoteWaiting' || type === undefined) && (
        <ButtonWrapper id="request-quote" onClick={handleRequest}>
          <ButtonWrapper.Button
            className="w-full lg:h-[6.4rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white"
            disabled={isCompleted}
          >
            {type === 'quoteWaiting' ? '견적 확정하기' : !isCompleted ? '지정 견적 요청하기' : '지정 견적 요청 완료'}
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {type === 'quoteReceived' && (
        <ButtonWrapper id="favorite-driver" onClick={handleFavorite}>
          <ButtonWrapper.Button className="w-full h-[5.4rem] rounded-[1.6rem] p-[1rem] font-semibold text-[2rem] leading-[3.2rem] text-black bg-white border border-line-200">
            <div className="flex flex-row gap-[1rem] items-center justify-center">
              <Image src={isCheckDib ? heart_red : heart_black} alt="heart" width={24} height={24} />
              <p>기사님 찜하기</p>
            </div>
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {type === 'InfoEditDriver' && (
        <ButtonWrapper id="basic-info-edit" onClick={handleEditBasicInfo}>
          <ButtonWrapper.Button className="lg:w-[28rem] sm:w-full rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-gray-300 bg-white border border-gray-200">
            <div className="flex flex-row gap-[0.6rem] items-center justify-center">
              <p>기본 정보 수정</p>
              <Image src={edit_gray} alt="edit" width={24} height={24} />
            </div>
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {type === 'InfoEditDriver' && (
        <ButtonWrapper id="my-profile-edit" onClick={handleEditProfile}>
          <ButtonWrapper.Button
            className="lg:w-[28rem] sm:w-full rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white"
            disabled={isCompleted}
          >
            <div className="flex flex-row gap-[0.6rem] items-center justify-center">
              <p>내 프로필 수정</p>
              <Image src={edit_white} alt="edit" width={24} height={24} />
            </div>
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {isModalOpen && <SpecifiedQuotationFailureModal onClose={handleCloseModal} />}
    </>
  );
}
