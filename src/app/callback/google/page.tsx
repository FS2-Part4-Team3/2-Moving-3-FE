'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '@/api/UserService';
import { setUserSign } from '@/store/slices/SignInSlice';

export default function CallBackGoogle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams?.get('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      const res = await getUserData();
      dispatch(
        setUserSign({
          id: res.id,
          name: res.name,
          nickname: res.type === 'driver' ? res.nickname : undefined,
          accessToken: res.accessToken,
          email: res.email,
          image: res.image,
          phoneNumber: res.phoneNumber,
          introduce: res.introduce,
          description: res.description,
          serviceTypes: res.serviceTypes,
          availableAreas: res.type === 'driver' ? res.availableAreas : undefined,
          areas: res.type === 'user' ? res.areas : undefined,
          type: res.type,
        }),
      );
      if (res.type === 'user') {
        router.push('/normal/match-driver');
      } else if (res.type === 'driver') {
        router.push('/driver/receive-quote');
      }
    };

    if (accessToken) {
      getData();
    }
  }, [accessToken, dispatch, router]);

  return (
    <div className="w-full min-h-screen">
      <div>
        <p>Loading ...</p>
      </div>
    </div>
  );
}
