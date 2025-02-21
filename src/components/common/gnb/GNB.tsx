'use client';

import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import chatIcon from '@/../public/assets/chat/icon_chat.svg';
import chatIconOn from '@/../public/assets/chat/icon_chat_alam.svg';
import alarm from '@/../public/assets/common/gnb/alarm.svg';
import profile from '@/../public/assets/common/gnb/default_profile.svg';
import logo from '@/../public/assets/common/gnb/logo-icon-text.svg';
import logo_sm from '@/../public/assets/common/gnb/logo-sm.svg';
import menu from '@/../public/assets/common/gnb/menu.svg';
import red_alarm from '@/../public/assets/common/gnb/red_alarm.svg';
import close from '@/../public/assets/common/icon_X.svg';
import { getNotification } from '@/api/NotificationService';
import { ModeToggle } from '@/components/common/gnb/ModeToggle';
import { Chat } from '@/interfaces/Card/ChatCardInterface';
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
  const user_profile = useSelector((state: RootState) => state.profile);
  const user_info = useSelector((state: RootState) => state.info);

  const isRequestQuote = pathname?.includes('request-quote'); // 견적 요청
  const isMatchDriver = pathname?.includes('match-driver'); // 기사님 찾기
  const isMyQuotes = pathname?.includes('my-quote'); // 내 견적 관리
  const isReceiveQuote = pathname?.includes('receive-quote'); // 받은 요청

  const [modalOpen, isModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const [notificationModalOpen, setNotificationsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationsVisible] = useState(false);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [chatRead, setChatRead] = useState<Chat | null>(null);

  const fetchNotifications = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data: NotificationResponse = await getNotification(pageNumber);
      setNotifications(prev => [...prev, ...data.list]);
    } catch (error) {
      console.error('알림 가져오는 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchNotifications(page);

      const newSocket = io(`${BASE_URL}`, {
        transports: ['websocket'],
        withCredentials: true,
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

      newSocket.on('chat', data => {
        setChatRead(data);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [page, user.id]);

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

  const loadMoreNotifications = () => {
    setPage(prevPage => prevPage + 1);
  };

  const slideIn = useSpring({
    transform: modalOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: 1,
    config: { tension: 200, friction: 25 },
  });

  const profileModalAnimation = useSpring({
    opacity: isProfileModalOpen ? 1 : 0,
    transform: isProfileModalOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  const notificationeModalAnimation = useSpring({
    opacity: notificationModalOpen ? 1 : 0,
    transform: notificationModalOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  useEffect(() => {
    if (modalOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (isProfileModalOpen) {
      setIsProfileVisible(true);
    } else {
      setTimeout(() => setIsProfileVisible(false), 300);
    }
  }, [isProfileModalOpen]);

  useEffect(() => {
    if (notificationModalOpen) {
      setIsNotificationsVisible(true);
    } else {
      setTimeout(() => setIsNotificationsVisible(false), 300);
    }
  }, [notificationModalOpen]);

  return (
    <>
      <div className="w-full lg:h-[8.8rem] sm:h-[5.4rem] bg-[#ffffff] border-b border-line-200 dark:bg-dark-p">
        <div className="w-full lg:py-[2.6rem] lg:px-[12rem] sm:py-[1rem] sm:px-[2.4rem] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center lg:gap-[8.2rem]">
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
            <div className="flex gap-[4rem]">
              {status === 'General' && (
                <Link href="/normal/request-quote" className="lg:block sm:hidden cursor-pointer">
                  <p
                    className={`font-bold text-[1.8rem] leading-[2.6rem] ${isRequestQuote ? 'text-black-400 dark:text-dark-t' : 'text-gray-400 dark:text-gray-100'}`}
                  >
                    견적 요청
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/receive-quote" className="lg:block sm:hidden cursor-pointer">
                  <p
                    className={`font-bold text-[1.8rem] leading-[2.6rem] ${isReceiveQuote ? 'text-black-400 dark:text-dark-t' : 'text-gray-400 dark:text-gray-100'}`}
                  >
                    받은 요청
                  </p>
                </Link>
              )}
              {status !== 'Driver' && (
                <Link
                  href={`${status === 'General' ? '/normal' : ''}/match-driver`}
                  className="lg:block sm:hidden cursor-pointer"
                >
                  <p
                    className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMatchDriver ? 'text-black-400 dark:text-dark-t' : 'text-gray-400 dark:text-gray-100'}`}
                  >
                    기사님 찾기
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/my-quote/sent" className="lg:block sm:hidden cursor-pointer">
                  <p
                    className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMyQuotes ? 'text-black-400 dark:text-dark-t' : 'text-gray-400 dark:text-gray-100'}`}
                  >
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'General' && (
                <Link href="/normal/my-quote/waiting" className="lg:block sm:hidden cursor-pointer">
                  <p
                    className={`font-bold text-[1.8rem] leading-[2.6rem] ${isMyQuotes ? 'text-black-400 dark:text-dark-t' : 'text-gray-400 dark:text-gray-100'}`}
                  >
                    내 견적 관리
                  </p>
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[2rem] justify-end">
            {status === 'LogOut' && <ModeToggle />}
            {status === 'LogOut' && (
              <div className="lg:block sm:hidden">
                <Link href="/normal/sign-in">
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
                  src={chatRead ? chatIconOn : chatIcon}
                  alt="chat"
                  width={48}
                  height={48}
                  className="lg:block sm:hidden cursor-pointer"
                  onClick={() => router.push('/chat')}
                />
                <Image
                  src={chatRead ? chatIconOn : chatIcon}
                  alt="chat"
                  width={36}
                  height={36}
                  className="lg:hidden sm:block cursor-pointer"
                  onClick={() => router.push('/chat')}
                />
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
                {isNotificationVisible && (
                  <div className="absolute lg:top-[8.1rem] transform lg:translate-x-[-15rem] z-[10] md:top-[6.5rem] md:translate-x-[-3rem] sm:top-[6.1rem] sm:translate-x-[3rem]">
                    <animated.div style={notificationeModalAnimation}>
                      <Notification
                        notifications={notifications}
                        onClose={() => setNotificationsModalOpen(false)}
                        onNotificationClick={handleNotificationClick}
                        onMorePage={loadMoreNotifications}
                        loading={loading}
                      />
                    </animated.div>
                  </div>
                )}
                <ModeToggle />
                <div className="flex">
                  {user.image || user_profile.image ? (
                    <Image
                      src={user_profile.image || (user.image ?? profile)}
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
                  {isProfileVisible && (
                    <div className="absolute top-[5rem] transform translate-x-[-10rem] z-[10] lg:hidden sm:block">
                      <animated.div style={profileModalAnimation}>
                        <Profile closeModal={handleCloseProfileModal} />
                      </animated.div>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div
                    className="flex lg:gap-[1.6rem] sm:gap-[2.4rem] items-center justify-center cursor-pointer"
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  >
                    {user.image || user_profile.image ? (
                      <Image
                        src={user_profile.image || (user.image ?? profile)}
                        alt="profile"
                        width={36}
                        height={36}
                        className="lg:block sm:hidden cursor-pointer rounded-full"
                      />
                    ) : (
                      <Image
                        src={profile}
                        alt="profile"
                        width={36}
                        height={36}
                        className="lg:block sm:hidden cursor-pointer rounded-full"
                      />
                    )}
                    <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400 dark:text-dark-t lg:block sm: hidden">
                      {user_info.name || user.name}
                    </p>
                  </div>
                  {isProfileVisible && (
                    <div className="absolute top-[8rem] transform translate-x-[-15rem] z-[10] lg:block sm:hidden">
                      <animated.div style={profileModalAnimation}>
                        <Profile closeModal={handleCloseProfileModal} />
                      </animated.div>
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
      </div>
      {isVisible && (
        <div className="fixed inset-0 w-full flex justify-end h-full bg-[#000000] bg-opacity-50 z-10">
          <animated.div style={slideIn} className="w-[22rem] bg-[#ffffff] flex flex-col dark:bg-dark-p">
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
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
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
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
                    기사님 찾기
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/receive-quote" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
                    받은 요청
                  </p>
                </Link>
              )}
              {status === 'Driver' && (
                <Link href="/driver/my-quote/sent" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'General' && (
                <Link href="/normal/my-quote/waiting" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
                    내 견적 관리
                  </p>
                </Link>
              )}
              {status === 'LogOut' && (
                <Link href="/normal/sign-in" className="cursor-pointer" onClick={() => isModalOpen(false)}>
                  <p className="w-full py-[2.4rem] px-[2rem] gap-1rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
                    로그인
                  </p>
                </Link>
              )}
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
}
