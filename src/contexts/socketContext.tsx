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
  userId: string;
  driverId: string;
  direction: Direction;
  message: string;
  image?: string;
  isRead?: boolean;
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
    const newSocket = io(`${BASE_URL}`, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('subscribe', { userId: user.id, chatId: chat.id });
      console.log('Socket connected');
    });

    newSocket.on('typing', (data: { id: string }) => {
      setIsTyping(true);
      setTypingUser(data.id);
    });

    newSocket.on('stopped_typing', () => {
      setIsTyping(false);
      setTypingUser(null);
    });

    newSocket.on('chat', (data: Chat) => {
      queryClient.setQueryData<{ pages: { messages: any[] }[]; pageParams: any[] }>(['chatMessages'], oldData => {
        if (!oldData) return oldData;

        const newPages = [...oldData.pages];
        const lastPage = newPages[newPages.length - 1];

        lastPage.messages = [
          ...lastPage.messages,
          {
            message: data.message,
            direction: data.direction,
            isRead: data.isRead,
            userId: data.userId,
            driverId: data.driverId,
            image: data.image,
          },
        ];

        return { ...oldData, pages: newPages };
      });
    });

    return () => {
      newSocket.close();
    };
  }, [user.id, chat.id, queryClient]);

  return <SocketContext.Provider value={{ socket, isTyping, typingUser }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
