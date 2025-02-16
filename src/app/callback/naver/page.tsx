'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '@/api/UserService';
import { setUserSign } from '@/store/slices/SignInSlice';

export default function CallBackNaver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams?.get('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      // if (accessToken) {
      //   localStorage.setItem('accessToken', accessToken);
      // }

      const res = await getUserData();
      dispatch(
        setUserSign({
          id: res.id,
          name: res.name,
          nickname: res.type === 'driver' ? res.nickname : undefined,
          // accessToken: res.accessToken,
          email: res.email,
          image: res.image,
          phoneNumber: res.phoneNumber,
          introduce: res.introduce,
          description: res.description,
          serviceType: res.serviceType,
          availableAreas: res.type === 'driver' ? res.availableAreas : undefined,
          areas: res.type === 'user' ? res.areas : undefined,
          type: res.type,
        }),
      );
      if (res.type === 'user' && (!res.areas || !res.serviceType.length)) {
        router.push('/normal/profile-register');
      } else if (res.type === 'user' && res.areas && res.serviceType.length) {
        router.push('/normal/match-driver');
      } else if (res.type === 'driver' && !res.introduce && !res.description && !res.availableAreas.length && !res.nickname) {
        router.push('/driver/profile-register');
      } else if (res.type === 'driver' && res.introduce && res.description && res.availableAreas.length) {
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
