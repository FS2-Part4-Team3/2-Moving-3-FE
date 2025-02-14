import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';
import { getDriverDetailData } from '@/api/DriverService';
import { getChatData } from '@/api/chatService';
import { ChatData, InfoData } from '@/interfaces/Card/ChatCardInterface';

export default function ChatCard({ id }: { id: string }) {
  const { data: inforData } = useQuery<InfoData>({
    queryKey: ['infoData', id],
    queryFn: () => getDriverDetailData(id),
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

    const lastMessage = lastChatData?.list?.[lastChatData.list.length - 1]?.message || '';

    return { message: lastMessage };
  };

  const { message } = lastChatMessage(id, 10);

  return (
    <div>
      <div>
        <Image src={inforData?.image || profile_default} alt={inforData?.name || '기본 이미지'} width={79.88} height={73.33} />
      </div>
      <div>
        <div>
          <p>{inforData?.name}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}
