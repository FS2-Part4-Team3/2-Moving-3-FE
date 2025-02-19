'use client';

import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket, io } from 'socket.io-client';
import { RootState } from '@/store/store';

type Direction = 'USER_TO_DRIVER' | 'DRIVER_TO_USER';

interface SocketContextType {
  socket: Socket | null;
  isTyping: boolean;
  typingUser: string | null;
}

interface Chat {
  type: 'NEW_CHAT' | 'CHATS_READ';
  data: {
    userId: string;
    driverId: string;
    direction: Direction;
    message: string;
    image: string;
    isRead: boolean;
  };
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isTyping: false,
  typingUser: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.signIn);
  const chat = useSelector((state: RootState) => state.chat);
  const queryClient = useQueryClient();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const newSocket = io(`${BASE_URL}`);
    setSocket(newSocket);

    newSocket.emit('subscribe', { userId: user.id, chatId: chat.id });

    newSocket.on('typing', (data: { id: string }) => {
      setIsTyping(true);
      setTypingUser(data.id);
    });

    newSocket.on('stopped_typing', () => {
      setIsTyping(false);
      setTypingUser(null);
    });

    newSocket.on('chat', (data: Chat) => {
      if (data.type === 'NEW_CHAT') {
        queryClient.setQueryData<{ pages: { messages: any[] }[]; pageParams: any[] }>(['chatMessages'], oldData => {
          if (!oldData) return oldData;

          const newPages = [...oldData.pages];
          const lastPage = newPages[newPages.length - 1];

          lastPage.messages = [
            ...lastPage.messages,
            {
              message: data.data.message,
              direction: data.data.direction,
              isRead: data.data.isRead,
              userId: data.data.userId,
              driverId: data.data.driverId,
              image: data.data.image,
            },
          ];

          return { ...oldData, pages: newPages };
        });

        queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      } else if (data.type === 'CHATS_READ') {
        queryClient.setQueryData<{ pages: { messages: any[] }[]; pageParams: any[] }>(['chatMessages'], oldData => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map(page => ({
            ...page,
            messages: page.messages.map(message => ({
              ...message,
              isRead: true,
            })),
          }));

          return {
            ...oldData,
            pages: newPages,
          };
        });

        queryClient.setQueryData(['unreadCount'], 0);
      }
    });

    return () => {
      newSocket.close();
    };
  }, [user.id, chat.id, queryClient]);

  return <SocketContext.Provider value={{ socket, isTyping, typingUser }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
