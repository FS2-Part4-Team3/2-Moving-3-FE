import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';
import { getDriverDetailData } from '@/api/DriverService';
import { getOnlineStatus, getUserDetailData } from '@/api/UserService';
import { getChatData } from '@/api/chatService';
import { ChatData, InfoData, Online } from '@/interfaces/Card/ChatCardInterface';

export default function ChatCard({ id }: { id: string }) {
  const { data: driverInforData } = useQuery<InfoData>({
    queryKey: ['driverInfoData', id],
    queryFn: () => getDriverDetailData(id),
  });

  const { data: userInforData } = useQuery<InfoData>({
    queryKey: ['userInfoData', id],
    queryFn: () => getUserDetailData(id),
  });

  const { data: onlineStatus } = useQuery<Online>({
    queryKey: ['onlineStatus', id],
    queryFn: () => getOnlineStatus(id),
  });

  const lastChatMessage = (id: string, pageSize: number) => {
    const {
      data: chatData,
      error,
      isLoading,
    } = useQuery<ChatData>({
      queryKey: ['chatData', id],
      queryFn: () => getChatData(id, 1, pageSize),
    });

    if (isLoading) return { message: '', isLoading };
    if (error) return { message: '', error };

    const totalCount = chatData?.totalCount || 0;
    const lastPage = Math.ceil(totalCount / pageSize);

    const { data: lastChatData } = useQuery<ChatData>({
      queryKey: ['chatData', id, lastPage],
      queryFn: () => getChatData(id, lastPage, pageSize),
    });

    const unReadMessgeCount = lastChatData?.list?.filter(chat => !chat.isRead).length || 0;
    const lastMessageObj = lastChatData?.list?.[lastChatData.list.length - 1];
    const isRead = lastMessageObj?.isRead;
    const lastMessage = lastMessageObj?.message || '';

    return { message: lastMessage, isRead, unReadCount: unReadMessgeCount };
  };

  const { message, isRead, unReadCount } = lastChatMessage(id, 10);

  return (
    <div className="flex items-center lg:gap-x-[1rem] md:gap-x-[0.8rem] sm:gap-x-[0.8rem] lg:px-[2rem] md:px-[1.4rem] sm:px-[1.4rem] border-b-[0.1rem] border border-line-100 cursor-pointer ">
      <div className="lg:w-[7.9rem] lg:h-[7.3rem] md:w-[6rem] md:h-[5.5rem] sm:w-[6rem] sm:h-[5.5rem]">
        <Image
          src={driverInforData?.image || userInforData?.image || profile_default}
          alt={driverInforData?.name || userInforData?.name || '기본 이미지'}
          fill
        />
      </div>
      <div className="flex flex-col gap-y-[0.5rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-[1.6rem]">
            <p className="lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 ">
              {driverInforData?.name || userInforData?.name}{' '}
              {driverInforData?.type === 'driver' ? '기사님' : userInforData?.type === 'user' ? '고객님' : ''}
            </p>
            <div className="flex gap-x-[0.9rem]">
              <div className={`w-[1.4rem] h-[1.4rem] rounded-full ${onlineStatus ? 'bg-[#32CD32]' : 'bg-gray-300'}`}></div>
              <p>{onlineStatus ? '온라인' : '오프라인'}</p>
            </div>
          </div>
          {!isRead && (
            <div className="lg:w-[2.4rem] lg:h-[2.4rem] md:w-[2rem] md:h-[2rem] sm:w-[2rem] sm:h-[2rem] flex items-center justify-center rounded-full bg-red-200 text-center">
              <p className="text-[1.4rem] font-semibold text-white ">{unReadCount}</p>
            </div>
          )}
        </div>
        <p className="lg:text-[1.6rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-gray-500">{message}</p>
      </div>
    </div>
  );
}
