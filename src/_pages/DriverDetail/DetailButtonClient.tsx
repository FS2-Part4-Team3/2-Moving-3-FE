'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import edit_white from '@/../../public/assets/common/ic_writing.svg';
import edit_gray from '@/../../public/assets/common/ic_writing_gray.svg';
import heart_black from '@/../../public/assets/driver/ic_like.svg';
import heart_red from '@/../../public/assets/driver/ic_like_on.svg';
import { delDibDriver, getDibDriver, postDibDriver } from '@/api/DriverService';
import { getCheckRequestDriver, getUserMoveInfoId, postMovesConfirm, postRequestDriver } from '@/api/MovesService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import SpecifiedQuotationFailureModal from '@/components/modal/SpecifiedQuotationFailureModal';
import { useSocket } from '@/contexts/socketContext';
import type { DetailButtonClientProps } from '@/interfaces/Page/DriverDetailInterface';
import { setChat } from '@/store/slices/chatSlice';
import { RootState } from '@/store/store';

export default function DetailButtonClient({ type, id, estimationId }: DetailButtonClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCheckDib, setIsCheckDib] = useState(false);
  const isMoveId = useSelector((state: RootState) => state.signIn.moveInfoId);
  const userId = useSelector((state: RootState) => state.signIn.id);
  const chatId = useSelector((state: RootState) => state.chat.id);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // const [isMoveId, setIsMoveId] = useState('');

  const userType = useSelector((state: RootState) => state.signIn.type);

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
          console.error('요청 상태를 가져오는 데 실패했습니다: ', err);
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

  const handleChat = () => {
    socket?.emit('chat', {
      userId: userId,
      driverId: id,
      message: '시작',
      image: '',
    });
    dispatch(
      setChat({
        id: id,
      }),
    );

    queryClient.invalidateQueries({ queryKey: ['chatList'] });
    router.push('/chat');
  };

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

  const confirmationMutation = useMutation({
    mutationFn: async () => {
      if (!estimationId) {
        throw new Error('estimationId가 필요합니다.');
      }
      if (!isMoveId) {
        throw new Error('estimationId가 필요합니다.');
      }
      await postMovesConfirm(isMoveId, estimationId);
    },
    onSuccess: () => {
      setIsCompleted(true);
      alert('견적 확정되었습니다.');
      router.push('/normal/my-quote/received');
    },
    onError: () => {
      alert('문제가 발생했습니다. 다시 시도해주세요.');
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
    if (type === 'quoteWaiting') {
      confirmationMutation.mutate();
      return;
    } else {
      if (!isMoveId) {
        setIsModalOpen(true);
        return;
      } else {
        await postRequestDriver(id);
      }
    }
    setIsCompleted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProfile = () => {
    router.push('/driver/my-page/edit-profile');
  };

  const handleEditBasicInfo = () => {
    router.push('/driver/my-page/edit-basic-info');
  };

  console.log('driver', chatId);

  return (
    <>
      {(type === 'quoteWaiting' || type === undefined) && (
        <ButtonWrapper id="driver-chat" onClick={handleChat}>
          <ButtonWrapper.Button className="w-full bg-blue-400 lg:h-[6.4rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] flex items-center justify-center text-white">
            기사님과 채팅하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
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
      {type === 'infoEditDriver' && (
        <ButtonWrapper id="basic-info-edit" onClick={handleEditBasicInfo}>
          <ButtonWrapper.Button className="lg:w-[28rem] sm:w-full rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-gray-300 bg-white border border-gray-200">
            <div className="flex flex-row gap-[0.6rem] items-center justify-center">
              <p>기본 정보 수정</p>
              <Image src={edit_gray} alt="edit" width={24} height={24} />
            </div>
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
      {type === 'infoEditDriver' && (
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
