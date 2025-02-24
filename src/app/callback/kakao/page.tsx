'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserMoveInfoId } from '@/api/MovesService';
import { getUserData } from '@/api/UserService';
import { setMoveInfoId, setUserSign } from '@/store/slices/SignInSlice';

export default function CallBackKakao() {
  const router = useRouter();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const getQueryAccessToken = queryParams.get('accessToken');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getUserData();

        const accessToken = getQueryAccessToken;
        await fetch('/api/auth/sync-cookie', {
          method: 'POST',
          body: JSON.stringify({ cookie: accessToken }),
        });

        dispatch(
          setUserSign({
            id: res.id,
            name: res.name,
            nickname: res.type === 'driver' ? res.nickname : undefined,
            email: res.email,
            image: res.image,
            phoneNumber: res.phoneNumber,
            introduce: res.introduce,
            description: res.description,
            serviceType: res.serviceType,
            availableAreas: res.type === 'driver' ? res.availableAreas : undefined,
            areas: res.type === 'user' ? res.areas : undefined,
            type: res.type,
            provider: res.provider,
            moveInfoId: '',
          }),
        );

        if (res.type === 'user') {
          try {
            const moveInfoRes = await getUserMoveInfoId();
            const moveInfoId = moveInfoRes?.id;

            if (moveInfoId) {
              dispatch(setMoveInfoId(moveInfoId));
            }
          } catch (error) {
            console.error('moveInfoId 가져오기 실패:', error);
          }
        }

        if (res.type === 'user' && (!res.areas || !res.serviceTypes)) {
          router.push('/normal/profile-register');
        } else if (res.type === 'user' && res.areas && res.serviceTypes) {
          router.push('/normal/match-driver');
        } else if (res.type === 'driver' && (!res.introduce || !res.description || !res.availableAreas || !res.nickname)) {
          router.push('/driver/profile-register');
        } else if (res.type === 'driver' && res.introduce && res.description && res.availableAreas && res.nickname) {
          router.push('/driver/receive-quote');
        }
      } catch (error) {
        console.error('로그인 상태 확인 중 오류 발생', error);
        return;
      }
    };

    checkLoginStatus();
  }, [dispatch, router]);

  return (
    <div className="w-full min-h-screen">
      <div>
        <p>Loading ...</p>
      </div>
    </div>
  );
}
