'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '@/api/UserService';
import { setIsPasswordCheck } from '@/store/slices/ProfileSlice';

export default function CallBackGoogleVerify() {
  const router = useRouter();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const getQueryAccessToken = queryParams.get('accessToken');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getUserData();
        console.log(res);
        const accessToken = getQueryAccessToken;
        await fetch('/api/auth/sync-cookie', {
          method: 'POST',
          body: JSON.stringify({ cookie: accessToken }),
        });

        dispatch(setIsPasswordCheck({ isPasswordCheck: true }));

        if (res.type === 'user') {
          router.push('/normal/my-page/edit-profile');
        } else if (res.type === 'driver') {
          router.push('/driver/my-page/edit-basic-info');
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
