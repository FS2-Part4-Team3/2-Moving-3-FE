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
  id: string;
  createdAt: string;
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
    if (!BASE_URL) return;

    const newSocket = io(`${BASE_URL}`, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('subscribe');
    });

    newSocket.on('disconnect', () => {});

    newSocket.on('typing', (data: { id: string }) => {
      setIsTyping(true);
      setTypingUser(data.id);
    });

    newSocket.on('stopped_typing', () => {
      setIsTyping(false);
      setTypingUser(null);
    });

    newSocket.on('chat', (data: Chat) => {
      queryClient.setQueryData<{ pages: { data: { list: Chat[] } }[]; pageParams: any[] }>(
        ['chatMessages', chat.id],
        oldData => {
          if (!oldData) {
            return {
              pages: [
                {
                  data: {
                    list: [data],
                  },
                  nextPage: undefined,
                },
              ],
              pageParams: [1],
            };
          }

          const newPages = oldData.pages.map((page, index) => {
            if (index === oldData.pages.length - 1) {
              return {
                ...page,
                data: {
                  ...page.data,
                  list: [...page.data.list, data],
                },
              };
            }
            return page;
          });

          return {
            ...oldData,
            pages: newPages,
          };
        },
        { updatedAt: new Date().getTime() },
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [BASE_URL, user.id, chat.id, queryClient]);

  return <SocketContext.Provider value={{ socket, isTyping, typingUser }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
