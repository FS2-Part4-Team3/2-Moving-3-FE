'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getChatData, postRead } from '@/api/ChatsService';
import { getDriverDetailData } from '@/api/DriverService';
import { getUserDetailData } from '@/api/UserService';
import { useSocket } from '@/contexts/socketContext';
import { Chat, ChatRead, InfoData } from '@/interfaces/Card/ChatCardInterface';
import { ChatProps } from '@/interfaces/Section/ChatListInterface';
import { RootState } from '@/store/store';
import ChatTab from '../Tabs/ChatTab';
import Empty from '../common/Empty/Empty';
import ChatInput from '../inputs/ChatInput';

export default function ChatContent({ isChatList, setIsChatList }: ChatProps) {
  const { isTyping, typingUser } = useSocket();
  const { ref, inView } = useInView();
  const chat = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.signIn);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 10;
  const queryClient = useQueryClient();

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['chatMessages', chat.id],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const response = await getChatData(chat.id || '', pageParam, PAGE_SIZE);

      return {
        data: {
          list: response.list ?? [],
          totalCount: response.totalCount,
        },
        nextPage: pageParam < Math.ceil(response.totalCount / PAGE_SIZE) ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 0,
  });

  const messages = chatMessages?.pages.flatMap(page => page.data.list).reverse() ?? [];
  const unreadMessageIds = messages
    .filter(message => !message.isRead)
    .map(message => message.id)
    .filter(Boolean) as string[];

  const readMutation = useMutation({
    mutationFn: () => {
      if (unreadMessageIds.length > 0) {
        const chatRead: ChatRead = { ids: unreadMessageIds };
        return postRead(chat.id || '', chatRead);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages', chat.id] });
    },
  });

  const { data: driverInforData } = useQuery<InfoData>({
    queryKey: ['driverInfoData', typingUser],
    queryFn: async () => {
      if (typingUser) {
        return await getDriverDetailData(typingUser);
      }
    },
    enabled: user.type === 'user',
  });

  const { data: userInforData } = useQuery<InfoData>({
    queryKey: ['userInfoData', typingUser],
    queryFn: async () => {
      if (typingUser) {
        return await getUserDetailData(typingUser);
      }
    },
    enabled: user.type === 'driver',
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chatMessages', chat.id] });
  }, [chat.id, queryClient]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (unreadMessageIds.length > 0) {
      readMutation.mutate();
    }
  }, [unreadMessageIds.length]);

  return (
    <div className={`flex flex-col  lg:block ${isChatList ? 'md:hidden sm:hidden' : 'md:block sm:block'}`}>
      {chat.id ? (
        <>
          <div className="lg:w-[calc(100vw-45rem)] md:w-screen sm:w-full">
            <ChatTab isChatList={isChatList} setIsChatList={setIsChatList} />
          </div>
          <div className="flex flex-col bg-background-200 dark:bg-dark-p lg:w-[calc(100vw-45rem)] md:w-screen sm:w-screen h-[calc(100vh-6rem)]">
            <div className="flex-1 px-[2.4rem] overflow-y-auto">
              <div className="py-[2rem] space-y-[1.6rem]">
                {hasNextPage && (
                  <div ref={ref} className="text-center text-gray-500 dark:text-dark-t text-[1.4rem]">
                    이전 메세지 불러오는 중...
                  </div>
                )}
                {messages.map((message: Chat, index: number) => (
                  <div
                    key={`${message.id || ''}-${index}`}
                    className={`flex ${
                      user.type === 'user'
                        ? message.direction === 'USER_TO_DRIVER'
                          ? 'flex-row-reverse'
                          : 'flex-row'
                        : message.direction === 'USER_TO_DRIVER'
                          ? 'flex-row'
                          : 'flex-row-reverse'
                    } items-end gap-[1rem]`}
                  >
                    <div className={`max-w-[50%]`}>
                      <div
                        className={`inline-block rounded-[1.6rem] px-[1.6rem] py-[1.2rem] ${
                          user.type === 'user'
                            ? message.direction === 'USER_TO_DRIVER'
                              ? 'bg-blue-200 text-white rounded-tr-none'
                              : 'bg-white text-black-400 rounded-tl-none'
                            : message.direction === 'USER_TO_DRIVER'
                              ? 'bg-white text-black-400 rounded-tl-none'
                              : 'bg-blue-200 text-white rounded-tr-none'
                        }`}
                      >
                        <p className="text-[1.6rem] break-words">{message.message}</p>
                        {message.image && <Image src={message.image} alt="첨부된 이미지" width={200} height={200} />}
                      </div>
                    </div>
                    <p className="text-[1.2rem] text-gray-500 dark:text-dark-t">{message.isRead ? '읽음' : '안읽음'}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="flex-shrink-0 px-[2.4rem] py-[2rem] bg-background-200 dark:bg-dark-bg">
              <ChatInput />
              {isTyping && (
                <p className="text-[1.6rem] font-medium text-gray-500 dark:text-dark-t">
                  {userInforData?.name || driverInforData?.name}님이 입력중입니다...
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="lg:w-[calc(100vw-45rem)] md:w-screen sm:w-screen">
            <ChatTab isChatList={isChatList} setIsChatList={setIsChatList} />
          </div>
          <div className="flex justify-center items-center lg:w-[calc(100vw-45rem)] h-full dark:bg-dark-bg">
            <Empty type="Chat" />
          </div>
        </>
      )}
    </div>
  );
}
