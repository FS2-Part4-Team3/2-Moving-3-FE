'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';
import { getDriverDetailData } from '@/api/DriverService';
import { getOnlineStatus, getUserDetailData } from '@/api/UserService';
import { InfoData, Online } from '@/interfaces/Card/ChatCardInterface';
import { RootState } from '@/store/store';

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.signIn);
  const chat = useSelector((state: RootState) => state.chat);

  const { data: driverInforData } = useQuery<InfoData>({
    queryKey: ['driverInfoData', chat.id],
    queryFn: () => getDriverDetailData(chat.id),
    enabled: user.type === 'user',
  });

  const { data: userInforData } = useQuery<InfoData>({
    queryKey: ['userInfoData', chat.id],
    queryFn: () => getUserDetailData(chat.id),
    enabled: user.type === 'driver',
  });

  return (
    <div>
      <div>
        <div className="w-[7.9rem] relative">
          <Image
            src={driverInforData?.image || userInforData?.image || profile_default}
            alt={driverInforData?.name || userInforData?.name || '기본 이미지'}
            fill
          />
        </div>
        <p className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 ">
          {driverInforData?.name || userInforData?.name} {driverInforData ? '기사님' : userInforData ? '고객님' : ''}
        </p>
      </div>
      <div></div>
    </div>
  );
}
