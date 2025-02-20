'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import calendar from '@/../public/assets/chat/ic_calendar.svg';
import dropdown from '@/../public/assets/chat/ic_dropdown.svg';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';
import heart from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { getDriverDetailData } from '@/api/DriverService';
import { getOnlineStatus, getUserDetailData } from '@/api/UserService';
import { InfoData, Online } from '@/interfaces/Card/ChatCardInterface';
import { DriverDetailData } from '@/interfaces/Page/DriverDetailInterface';
import { RootState } from '@/store/store';

export default function ChatTab() {
  const user = useSelector((state: RootState) => state.signIn);
  const chat = useSelector((state: RootState) => state.chat);

  const { data: driverInforData } = useQuery<DriverDetailData>({
    queryKey: ['driverInfoData', chat.id],
    queryFn: () => getDriverDetailData(chat.id || ''),
    enabled: user.type === 'user',
  });

  const { data: userInforData } = useQuery<InfoData>({
    queryKey: ['userInfoData', chat.id],
    queryFn: () => getUserDetailData(chat.id || ''),
    enabled: user.type === 'driver',
  });

  const { data: onlineStatus } = useQuery<Online>({
    queryKey: ['onlineStatus', chat.id],
    queryFn: () => getOnlineStatus(chat.id || ''),
  });

  return (
    <div className="flex items-center justify-between h-[6.9rem] lg:w-full md:w-full sm:w-full lg:px-[1.9rem] md:px-[1.6rem] sm:px-[1.6rem] border-b-[0.3rem] border-line-100 ">
      <div className="flex items-center gap-[1.8rem]">
        <div className="lg:hidden md:block sm:block cursor-pointer">
          <Image src={dropdown} alt="드롭다운" width={32} height={32} />
        </div>
        <div className="lg:w-[4.6rem] lg:h-[4.1rem] md:w-[4.6rem] md:h-[4.1rem] sm:w-[4.6rem] sm:h-[4.1rem] relative">
          <Image
            src={driverInforData?.image || userInforData?.image || profile_default}
            alt={driverInforData?.name || userInforData?.name || '기본 이미지'}
            fill
          />
        </div>
        <div className="flex lg:flex-row md:flex-row sm:flex-col gap-[1rem]">
          <p className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 text-nowrap ">
            {driverInforData?.name || userInforData?.name} {driverInforData ? '기사님' : userInforData ? '고객님' : ''}
          </p>
          {user.type === 'driver' && (
            <div className="flex items-center gap-[0.3rem] text-nowrap">
              <Image src={calendar} alt="달력" width={24} height={24} />
              <p className="text-[1.8rem] font-medium text-black-300">{chat.date}</p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <p className="text-[1.6rem] font-medium text-black-300">{chat.serviceType}</p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <p className="text-[1.6rem] font-medium text-gray-300">
                출발 <span className="text-[1.6rem] font-medium text-black-300">{chat.fromAddress}년</span>
              </p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <p className="text-[1.6rem] font-medium text-gray-300">
                도착 <span className="text-[1.6rem] font-medium text-black-300">{chat.toAddress}년</span>
              </p>
            </div>
          )}
          {user.type === 'user' && (
            <div className="flex items-center gap-[0.3rem] text-nowrap">
              <Image src={heart} alt="좋아요" width={24} height={24} />
              <p className="text-[1.8rem] font-medium text-black-300">{driverInforData?.likeCount}</p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <Image src={star} alt="별" width={20} height={20} />
              <p className="text-[1.6rem] font-medium text-black-300">{driverInforData?.rating}</p>
              <p className="text-[1.6rem] font-medium text-gray-300">({driverInforData?.reviewCount})</p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <p className="text-[1.6rem] font-medium text-gray-300">
                경력 <span className="text-[1.6rem] font-medium text-black-300">{driverInforData?.career}년</span>
              </p>
              <div className="bg-line-200 w-[0.1rem] h-[1.4rem] mx-[1rem]"></div>
              <p className="text-[1.6rem] font-medium text-black-300">
                {driverInforData?.applyCount}건 <span className="text-[1.6rem] font-medium text-gray-300">확정</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-[0.9rem] text-nowrap">
        <div className={`w-[1.4rem] h-[1.4rem] rounded-full ${onlineStatus?.isOnline ? 'bg-[#32CD32]' : 'bg-gray-300'}`}></div>
        <p className="lg:text-[1.6rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 ">
          {onlineStatus?.isOnline ? '온라인' : '오프라인'}
        </p>
      </div>
    </div>
  );
}
