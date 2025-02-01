import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import xIcon from '@/../public/assets/common/icon_X.svg';
import { postNotificationSingleRead } from '@/api/NotificationService';
import { NotificationProps } from '@/interfaces/CommonComp/GnbInterface';
import { timeAgoFormat } from '@/utils/Format';

export default function Notification({ notifications, onClose, onNotificationClick }: NotificationProps) {
  // TODO: 기사님 이름 수정 필요
  // TODO: 이사 종류 수정 필요
  // TODO: 어디에서 어디로 이사하는지 수정 필요

  console.log('notification', notifications);

  const queryClient = useQueryClient();

  const singleReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await postNotificationSingleRead(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previousNotifications = queryClient.getQueryData<NotificationProps['notifications']>(['notifications']);

      queryClient.setQueryData(['notifications'], (old: any) =>
        old?.map((notif: any) => (notif.id === id ? { ...notif, isRead: true } : notif)),
      );

      return { previousNotifications };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['notifications'], context?.previousNotifications);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      singleReadMutation.mutate(notificationId, {
        onSuccess: () => {
          onNotificationClick(notificationId);
        },
      });
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col rounded-[2.4rem] border border-line-200 py-[1rem] px-[1.6rem] md:w-[38rem] sm:w-[30rem] h-[40.2rem] bg-white">
      <div className="flex w-full items-center justify-between py-[1.4rem] pr-[1.2rem] pl-[2.4rem]">
        <p className="font-bold text-[1.8rem] leading-[2.6rem] text-black-400">알림</p>
        <Image src={xIcon} alt="x" width={24} height={24} className="cursor-pointer" onClick={onClose} />
      </div>
      {notifications.length ? (
        <div className="overflow-y-auto">
          <div className="flex flex-col w-full pr-[0.5rem]">
            {notifications.map((notification, index) => {
              let fir_message = '';
              let blue_message = '';
              let sec_message = '';

              switch (notification.type) {
                case 'MOVE_INFO_EXPIRED':
                  fir_message = '요청한 견적 정보가 ';
                  blue_message = '만료';
                  sec_message = '되었어요.';
                  break;
                case 'NEW_REQUEST':
                  blue_message = '새로운 견적 요청';
                  sec_message = '이 도착했어요.';
                  break;
                case 'NEW_ESTIMATION':
                  fir_message = '김코드 기사님의 ';
                  blue_message = '소형이사 견적';
                  sec_message = '이 도착했어요.';
                  break;
                case 'REQUEST_REJECTED':
                  fir_message = '보냈던 지정 견적 요청이 ';
                  blue_message = '반려';
                  sec_message = '되었어요.';
                  break;
                case 'ESTIMATION_CONFIRMED':
                  fir_message = '김코드 기사님의 견적이 ';
                  blue_message = '확정';
                  sec_message = '되었어요.';
                  break;
                case 'NEW_QUESTION':
                  fir_message = '김코드 기사님에게 ';
                  blue_message = '문의';
                  sec_message = '가 도착했어요.';
                  break;
                case 'D_7':
                  fir_message = '일주일 뒤에 ';
                  blue_message = '경기(일산) → 서울(영등포) 이사 예정일';
                  sec_message = '이에요.';
                  break;
                case 'D_1':
                  fir_message = '내일은 ';
                  blue_message = '경기(일산) → 서울(영등포) 이사 예정일';
                  sec_message = '이에요.';
                  break;
                case 'D_DAY':
                  fir_message = '오늘은 ';
                  blue_message = '경기(일산) → 서울(영등포) 이사 예정일';
                  sec_message = '이에요.';
                  break;
                default:
                  blue_message = '새로운 알림';
                  sec_message = '이 도착했어요.';
              }

              return (
                <div
                  key={notification.id}
                  className={`flex flex-col py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer 
                  ${notification.isRead ? 'bg-background-300' : 'bg-white'} 
                  ${index !== notifications.length - 1 ? 'border-b border-line-200' : ''}`}
                  onClick={() => handleClick(notification.id, notification.isRead)}
                >
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                    {fir_message}
                    <span className="text-blue-300">{blue_message}</span>
                    {sec_message}
                  </p>
                  <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">
                    {timeAgoFormat(notification.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-semibold text-[1.6rem] leading-[3.2rem] text-black-400">받은 알림이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
