'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import alarm from '@/../public/assets/common/gnb/alarm.svg';
import profile from '@/../public/assets/common/gnb/default_profile.svg';
import logo from '@/../public/assets/common/gnb/logo-icon-text.svg';
import logo_sm from '@/../public/assets/common/gnb/logo-sm.svg';
import menu from '@/../public/assets/common/gnb/menu.svg';
import red_alarm from '@/../public/assets/common/gnb/red_alarm.svg';
import close from '@/../public/assets/common/icon_X.svg';
import { getNotification } from '@/api/NotificationService';
import { NotificationData, NotificationDataStructure, NotificationResponse } from '@/interfaces/CommonComp/GnbInterface';
import { RootState } from '@/store/store';
import { ButtonWrapper } from '../headless/Button';
import Notification from './Notification';
import Profile from './Profile';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function GNB() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.signIn);

  const isRequestQuote = pathname?.includes('request-quote'); // 견적 요청
  const isMatchDriver = pathname?.includes('match-driver'); // 기사님 찾기
  const isMyQuotes = pathname?.includes('my-quote'); // 내 견적 관리
  const isReceiveQuote = pathname?.includes('receive-quote'); // 받은 요청

  const [modalOpen, isModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const fetchNotifications = async () => {
    try {
      const data: NotificationResponse = await getNotification();
      setNotifications(data.list);
    } catch (error) {
      console.error('알림 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const newSocket = io(`${BASE_URL}`, {
      auth: { token: user.accessToken },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      newSocket.emit('subscribe');
    });

    newSocket.on('notification', (data: NotificationDataStructure) => {
      if (data.type === 'NOTIFICATIONS_READ') {
        return;
      } else if (data.type === 'NEW_NOTIFICATION') {
        setNotifications(prev => [data.data, ...prev]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user.accessToken]);

  const handleRouteLanding = () => {
    router.push('/');
  };

  let status;

  switch (user.type) {
    case 'user':
      status = 'General';
      break;
    case 'driver':
      status = 'Driver';
      break;
    default:
      status = 'LogOut';
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleNotificationClick = (notificationId: string) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  return (
    <>
      <div className="w-full lg:h-[8.8rem] sm:h-[5.4rem] bg-[#ffffff] border-b border-line-200">
        <div className="w-full lg:py-[2.6rem] lg:px-[12rem] lg:gap-[8.2rem] sm:py-[1rem] sm:px-[2.4rem] flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={116}
            height={44}
            className="lg:block sm:hidden cursor-pointer"
            onClick={handleRouteLanding}
          />
          <Image
            src={logo}
            alt="logo"
            width={88}
            height={34}
            className="lg:hidden md:block sm:hidden cursor-pointer"
            onClick={handleRouteLanding}
          />
          <Image
            src={logo_sm}
            alt="logo"
            width={28.8}
            height={32.76}
            className="md:hidden sm:block cursor-pointer"
            onClick={handleRouteLanding}
          />
          <div className="w-full flex gap-[4rem]">
            {status === 'General' && (
              <Link href="/normal/request-quote" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isRequestQuote ? 'text-black-400' : 'text-gray-400'}`}>
                  견적 요청
                </p>
              </Link>
            )}
            {status === 'Driver' && (
              <Link href="/driver/receive-quote" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isReceiveQuote ? 'text-black-400' : 'text-gray-400'}`}>
                  받은 요청
                </p>
              </Link>
            )}
            {status !== 'Driver' && (
              <Link href={`${status === 'General' ? '/normal' : ''}/match-driver`} className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMatchDriver ? 'text-black-400' : 'text-gray-400'}`}>
                  기사님 찾기
                </p>
              </Link>
            )}
            {status === 'Driver' && (
              <Link href="/driver/my-quote/sent" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMyQuotes ? 'text-black-400' : 'text-gray-400'}`}>
                  내 견적 관리
                </p>
              </Link>
            )}
            {status === 'General' && (
              <Link href="/normal/my-quote/waiting" className="lg:block sm:hidden cursor-pointer">
                <p className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMyQuotes ? 'text-black-400' : 'text-gray-400'}`}>
                  내 견적 관리
                </p>
              </Link>
            )}
          </div>
          {status === 'LogOut' && (
            <div className="lg:block sm:hidden">
              <Link href="/normal/sign-in" className="flex items-center justify-center cursor-pointer">
                <ButtonWrapper id="login-button">
                  <ButtonWrapper.Button className="w-[11.6rem] h-[4.4rem] rounded-[1.6rem] p-[1.6rem] bg-blue-300 flex items-center justify-center font-semibold text-[1.8rem] leading-[2.6rem] text-white">
                    로그인
                  </ButtonWrapper.Button>
                </ButtonWrapper>
              </Link>
            </div>
          )}
          {status !== 'LogOut' && (
            <div className="flex gap-[3.2rem] items-center justify-end w-full">
              <Image
                src={notifications.some(n => !n.isRead) ? red_alarm : alarm}
                alt="alarm"
                width={36}
                height={36}
                className="lg:block sm:hidden cursor-pointer"
                onClick={() => setNotificationsModalOpen(!notificationModalOpen)}
              />
              <Image
                src={notifications.some(n => !n.isRead) ? red_alarm : alarm}
                alt="alarm"
                width={24}
                height={24}
                className="lg:hidden sm:block cursor-pointer"
                onClick={() => setNotificationsModalOpen(!notificationModalOpen)}
              />
              {notificationModalOpen && (
                <div className="absolute lg:top-[8.1rem] transform lg:translate-x-[-15rem] z-[10] md:top-[6.5rem] md:translate-x-[-3rem] sm:top-[6.1rem] sm:translate-x-[3rem]">
                  <Notification
                    notifications={notifications}
                    onClose={() => setNotificationsModalOpen(false)}
                    onNotificationClick={handleNotificationClick}
                  />
                </div>
              )}
              <div className="flex relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="profile"
                    width={24}
                    height={24}
                    className="lg:hidden sm:block cursor-pointer rounded-full"
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  />
                ) : (
                  <Image
                    src={profile}
                    alt="profile"
                    width={24}
                    height={24}
                    className="lg:hidden sm:block cursor-pointer rounded-full"
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  />
                )}
                {isProfileModalOpen && (
                  <div className="absolute top-[5rem] transform translate-x-[-10rem] z-[10] lg:hidden sm:block">
                    <Profile closeModal={handleCloseProfileModal} />
                  </div>
                )}
              </div>
              <div className="flex flex-col relative">
                <div
                  className="flex lg:gap-[1.6rem] sm: gap-[2.4rem] items-center justify-center cursor-pointer"
                  onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                >
                  {user.image ? (
                    <Image src={user.image} alt="profile" width={36} height={36} className="lg:block sm:hidden" />
                  ) : (
                    <Image src={profile} alt="profile" width={36} height={36} className="lg:block sm:hidden" />
                  )}
                  <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm: hidden">{user.name}</p>
                </div>
                {isProfileModalOpen && (
                  <div className="absolute top-[5rem] transform translate-x-[-15rem] z-[10] lg:block sm:hidden">
                    <Profile closeModal={handleCloseProfileModal} />
                  </div>
                )}
              </div>
            </div>
          )}
          <Image
            src={menu}
            alt="menu"
            width={24}
            height={24}
            className="lg:hidden sm:block cursor-pointer"
            onClick={() => isModalOpen(true)}
          />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 w-full flex justify-end h-full bg-[#000000] bg-opacity-50 z-10">
          <div className="w-[22rem] bg-[#ffffff] flex flex-col">
            <div className="w-full flex justify-end py-[1rem] px-[1.6rem] gap-[1rem] border-b border-line-200">
              <Image
                src={close}
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => isModalOpen(false)}
              />
            </div>
            <div>
              {status === 'General' && (
                <Link href="/normal/request-quote" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    견적 요청
                  </p>
                </Link>
              )}
              {status !== 'Driver' && (
                <Link
                  href={`${status === 'General' ? '/normal' : ''}/match-driver`}
                  className="cursor-pointer"
                  onClick={() => isModalOpen(false)}
                >
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    기사님 찾기
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/receive-quote" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    받은 요청
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/my-quote/sent" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'General' && (
                <Link href="/normal/my-quote/waiting" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'LogOut' && (
                <Link href="/normal/sign-in" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    로그인
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
