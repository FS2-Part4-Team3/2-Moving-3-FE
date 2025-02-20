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
      const response = await getChatData(chat.id, pageParam, PAGE_SIZE);

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

  const messages = [...(chatMessages?.pages.flatMap(page => page.data.list) ?? [])];
  console.log(chatMessages);
  console.log(messages);

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[calc(100vw-45rem)]">
        <ChatTab />
      </div>
      <div className="bg-background-200 w-[calc(100vw-45rem)] h-screen lg:px-[2.4rem]">
        <div className="flex-1 overflow-y-auto py-[2rem] space-y-[1.6rem] ">
          {hasNextPage && (
            <div ref={ref} className="text-center text-gray-500 text-[1.4rem]">
              이전 메세지 불러오는 중...
            </div>
          )}
          {messages.map((message: Chat, index: number) => (
            <div
              key={`${message.id || ''}-${index}`}
              className={`flex ${message.direction === 'USER_TO_DRIVER' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[60%] rounded-[1.6rem] px-[1.6rem] py-[1.2rem] ${
                  message.direction === 'USER_TO_DRIVER' ? 'bg-blue-200 text-white' : 'bg-white text-black-400'
                }`}
              >
                <p className="text-[1.6rem] break-words">{message.message}</p>
                {message.image && <Image src={message.image} alt="첨부된 이미지" width={200} height={200} />}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <div className="absolute bottom-0 w-[calc(100vw-50rem)] mb-[2rem]">
          <ChatInput />
          {isTyping && <div>{typingUser}님이 입력중입니다...</div>}
        </div>
      </div>
    </div>
  );
}
