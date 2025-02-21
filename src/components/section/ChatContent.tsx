'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getChatData } from '@/api/ChatsService';
import { useSocket } from '@/contexts/socketContext';
import { Chat } from '@/interfaces/Card/ChatCardInterface';
import { RootState } from '@/store/store';
import ChatTab from '../Tabs/ChatTab';
import ChatInput from '../inputs/ChatInput';

export default function ChatContent() {
  const { isTyping, typingUser } = useSocket();
  const { ref, inView } = useInView();
  const chat = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.signIn);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 12;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
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

  useEffect(() => {
    refetch();
  }, [chat.id, refetch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages?.pages[chatMessages.pages.length - 1]?.data.list.length]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const initialMessages = chatMessages?.pages.flatMap(page => page.data.list) ?? [];
  const messages = [...initialMessages].reverse();

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[calc(100vw-45rem)]">
        <ChatTab />
      </div>
      <div className="flex flex-col bg-background-200 w-[calc(100vw-45rem)] h-[calc(100vh-6rem)]">
        <div className="flex-1 overflow-y-auto px-[2.4rem]">
          <div className="py-[2rem] space-y-[1.6rem]">
            {hasNextPage && (
              <div ref={ref} className="text-center text-gray-500 text-[1.4rem]">
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
                <p className="text-[1.2rem] text-gray-500">{message.isRead ? '읽음' : '안읽음'}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex-shrink-0 px-[2.4rem] py-[2rem] bg-background-200">
          <ChatInput />
          {isTyping && <p className="text-[1.6rem] font-medium text-gray-500">{typingUser}님이 입력중입니다...</p>}
        </div>
      </div>
    </div>
  );
}
