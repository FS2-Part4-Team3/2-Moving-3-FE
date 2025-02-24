import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loading_img from '@/../public/assets/common/gnb/notification-loading.gif';
import xIcon from '@/../public/assets/common/icon_X.svg';
import { getDriverDetailData } from '@/api/DriverService';
import { getUserEstimationDetailData } from '@/api/EstimationService';
import { getMovesDetailData } from '@/api/MovesService';
import { postNotificationSingleRead } from '@/api/NotificationService';
import { NotificationProps } from '@/interfaces/CommonComp/GnbInterface';
import { NotificationAddressFormat, timeAgoFormat } from '@/utils/Format';
import { ButtonWrapper } from '../headless/Button';

export default function Notification({ notifications, onClose, onNotificationClick, onMorePage, loading }: NotificationProps) {
  // TODO: 기사님 이름 수정 필요
  // TODO: 이사 종류 수정 필요
  // TODO: 어디에서 어디로 이사하는지 수정 필요

  const queryClient = useQueryClient();
  const [moveInfo, setMoveInfo] = useState<{ fromAddress?: string; toAddress?: string }>({});
  const [driverName, setDriverName] = useState<string | undefined>('');
  const [serviceType, setServiceType] = useState<string | undefined>('');

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

  const getMovesInfoMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await getMovesDetailData(id);
      const { fromAddress, toAddress } = res;
      return { fromAddress, toAddress };
    },
    onSuccess: data => {
      setMoveInfo(data);
    },
  });

  const getEstimationInfoMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await getUserEstimationDetailData(id);
      const driverDetailRes = await getDriverDetailData(res.driverId);
      return { res, driverDetailRes };
    },
    onSuccess: data => {
      setDriverName(data.driverDetailRes.driverId);
      setServiceType(data.res.serviceType);
    },
  });

  console.log(setDriverName);

  useEffect(() => {
    notifications.forEach(notification => {
      if (['D_7', 'D_1', 'D_DAY'].includes(notification.type)) {
        const dataId = notification.moveInfoId;
        if (dataId) {
          getMovesInfoMutation.mutate(dataId);
        }
      } else if (['NEW_ESTIMATION'].includes(notification.type)) {
        const dataId = notification.estimationId;
        if (dataId) {
          getEstimationInfoMutation.mutate(dataId);
        }
      }
    });
  }, [notifications]);

  const handleClick = (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      singleReadMutation.mutate(notificationId, {
        onSuccess: () => {
          onNotificationClick(notificationId);
        },
      });
    }
  };

  return (
    <div className="flex flex-col rounded-[2.4rem] border border-line-200 pt-[1rem] pb-[1.8rem] px-[1.6rem] md:w-[38rem] sm:w-[30rem] h-[40.2rem] bg-white dark:bg-dark-p">
      <div className="flex w-full items-center justify-between py-[1.4rem] pr-[1.2rem] pl-[2.4rem]">
        <p className="font-bold text-[1.8rem] leading-[2.6rem] text-black-400 dark:text-dark-t">알림</p>
        <Image src={xIcon} alt="x" width={24} height={24} className="cursor-pointer" onClick={onClose} />
      </div>
      {notifications.length ? (
        <div className="overflow-y-auto">
          <div className="flex flex-col w-full pr-[0.5rem] items-center">
            {notifications.map((notification, index) => {
              let fir_message = '';
              let blue_message = '';
              let sec_message = '';
              let id: string;

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
                  fir_message = `${driverName} 기사님의 `;
                  blue_message = `${serviceType} 견적`;
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
                  blue_message =
                    moveInfo.fromAddress && moveInfo.toAddress
                      ? `${NotificationAddressFormat(moveInfo.fromAddress)} → ${NotificationAddressFormat(moveInfo.toAddress)} 이사 예정일`
                      : '이사 예정일';
                  sec_message = '이에요.';
                  id = notification.moveInfoId || '';
                  break;
                case 'D_1':
                  fir_message = '내일은 ';
                  blue_message =
                    moveInfo.fromAddress && moveInfo.toAddress
                      ? `${NotificationAddressFormat(moveInfo.fromAddress)} → ${NotificationAddressFormat(moveInfo.toAddress)} 이사 예정일`
                      : '이사 예정일';
                  sec_message = '이에요.';
                  id = notification.moveInfoId || '';
                  break;
                case 'D_DAY':
                  fir_message = '오늘은 ';
                  blue_message =
                    moveInfo.fromAddress && moveInfo.toAddress
                      ? `${NotificationAddressFormat(moveInfo.fromAddress)} → ${NotificationAddressFormat(moveInfo.toAddress)} 이사 예정일`
                      : '이사 예정일';
                  sec_message = '이에요.';
                  id = notification.moveInfoId || '';
                  break;
                default:
                  blue_message = '새로운 알림';
                  sec_message = '이 도착했어요.';
              }

              return (
                <div
                  key={notification.id}
                  className={`flex flex-col py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer 
                  ${notification.isRead ? 'bg-background-300 dark:bg-dark-bg' : 'bg-white dark:bg-dark-p'} 
                  ${index !== notifications.length - 1 ? 'border-b border-line-200' : ''}`}
                  onClick={() => handleClick(notification.id, notification.isRead)}
                >
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400 dark:text-dark-t">
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
            <ButtonWrapper id="notification-page-load" onClick={onMorePage}>
              <ButtonWrapper.Button className="bg-white dark:bg-dark-p rounded-[0.8rem] gap-[0.4rem] flex w-fit mt-[1rem] p-[1rem] font-semibold text-[1.8rem] leading-[2.6rem] border border-line-200">
                더보기
                {loading && <Image src={loading_img} alt="loading" width={24} height={24} />}
              </ButtonWrapper.Button>
            </ButtonWrapper>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-semibold text-[1.6rem] leading-[3.2rem] text-black-400 dark:text-dark-t">받은 알림이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
