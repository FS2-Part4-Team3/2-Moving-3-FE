'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getChatData } from '@/api/ChatsService';
import { useSocket } from '@/contexts/socketContext';
import { Chat, ChatData } from '@/interfaces/Card/ChatCardInterface';
import { RootState } from '@/store/store';
import ChatTab from '../Tabs/ChatTab';
import ChatInput from '../inputs/ChatInput';

export default function ChatContent() {
  const { socket, isTyping, typingUser } = useSocket();
  const { ref, inView } = useInView();
  const [messages, setMessages] = useState<Chat[]>([]);
  const chat = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const PAGE_SIZE = 12;

  useEffect(() => {
    const fetchTotalPages = async () => {
      const response = await getChatData(chat.id, 1, PAGE_SIZE);
      const totalPages = Math.ceil(response.totalCount / PAGE_SIZE);
      setInitialPage(totalPages);
    };

    fetchTotalPages();
  }, [chat.id]);

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['chatMessages'],
    queryFn: async ({ pageParam = initialPage ?? 1 }: { pageParam: number }) => {
      const response = await getChatData(chat.id, pageParam, PAGE_SIZE);

      return {
        data: response,
        nextPage: pageParam > 1 ? pageParam - 1 : null,
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: initialPage ?? 1,
    enabled: initialPage !== null,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    if (chatMessages?.pages.length === 1) {
      scrollToBottom();
    }
  }, [chatMessages?.pages.length]);

  useEffect(() => {
    if (chatMessages) {
      const allMessages = chatMessages.pages.flatMap(page => page.data.list);
      setMessages(prevMessages => {
        const messageMap = new Map([...prevMessages, ...allMessages].map(msg => [msg.id, msg]));
        return Array.from(messageMap.values()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data: Chat) => {
      setMessages(prev => {
        if (prev.some(msg => msg.id === data.id)) {
          return prev;
        }
        const newMessages = [...prev, data];
        setTimeout(scrollToBottom, 100);
        return newMessages;
      });
    };

    socket.on('chat', handleNewMessage);
    return () => {
      socket.off('chat', handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="w-[calc(100vw-45rem)]">
        <ChatTab />
      </div>
      <div className="bg-background-200 w-[calc(100vw-45rem)] h-screen lg:px-[2.4rem]">
        <div className="flex-1 overflow-y-auto py-[2rem] space-y-[1.6rem]">
          {hasNextPage && (
            <div ref={ref} className="text-center text-gray-500 text-[1.4rem]">
              이전 메세지 불러오는 중...
            </div>
          )}
          {messages.map((message: Chat) => (
            <div key={message.id} className={`flex ${message.direction === 'USER_TO_DRIVER' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[60%] rounded-[1.6rem] px-[1.6rem] py-[1.2rem] ${
                  message.direction === 'USER_TO_DRIVER' ? 'bg-blue-500 text-white' : 'bg-white text-black-400'
                }`}
              ></div>
              <p className="text-[1.6rem] break-words">{message.message}</p>
              {message.image && <Image src={message.image} alt="첨부된 이미지" width={200} height={200} />}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <ChatInput />
        {isTyping && <div>{typingUser}님이 입력중입니다...</div>}
      </div>
    </div>
  );
}
