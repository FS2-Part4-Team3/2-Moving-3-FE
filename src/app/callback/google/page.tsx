'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserMoveInfoId } from '@/api/MovesService';
import { getUserData } from '@/api/UserService';
import { setMoveInfoId, setUserSign } from '@/store/slices/SignInSlice';

export default function CallBackGoogle() {
  console.log('wowowowowowowowowowowow');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('222222222');
    const queryParams = new URLSearchParams(location.search);
    const getQueryAccessToken = queryParams.get('accessToken');
    const checkLoginStatus = async () => {
      try {
        console.log('11111111111');
        const res = await getUserData();
        const accessToken = getQueryAccessToken;
        await fetch('/api/auth/sync-cookie', {
          method: 'POST',
          body: JSON.stringify({ cookie: accessToken }),
        });
        console.log(res);

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
        console.log('111');
        if (res.type === 'user' && (!res.areas || !res.serviceTypes)) {
          console.log('1');
          router.push('/normal/profile-register');
        } else if (res.type === 'user' && res.areas && res.serviceTypes) {
          console.log('2');
          router.push('/normal/match-driver');
        } else if (res.type === 'driver' && !res.introduce && !res.description && !res.availableAreas && !res.nickname) {
          console.log('3');
          router.push('/driver/profile-register');
        } else if (res.type === 'driver' && res.introduce && res.description && res.availableAreas) {
          console.log('4');
          router.push('/driver/receive-quote');
        } else {
          console.log(res);
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
