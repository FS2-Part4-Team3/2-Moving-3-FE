'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import send_btn from '@/../public/assets/chat/send_btn.svg';
import { useSocket } from '@/contexts/socketContext';
import type { Direction } from '@/interfaces/Input/ChatInputInterface';
import { RootState } from '@/store/store';

export default function ChatInput() {
  const [message, setMessage] = useState('');
  const { socket } = useSocket();
  const user = useSelector((state: RootState) => state.signIn);
  const chat = useSelector((state: RootState) => state.chat);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const handleTyping = useCallback(() => {
    if (socket) {
      socket.emit('typing', chat.id);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopped_typing', chat.id);
      }, 1000);
    }
  }, [socket, user.id]);

  const handleSubmit = () => {
    if (message.trim() && socket) {
      const direction: Direction = user.type === 'user' ? 'USER_TO_DRIVER' : 'DRIVER_TO_USER';

      const newMessage = {
        userId: user.type === 'user' ? user.id : chat.id,
        driverId: user.type === 'driver' ? user.id : chat.id,
        message: message.trim(),
        direction: direction,
      };

      queryClient.setQueryData(['chatMessages', chat.id], (oldData: any) => {
        if (!oldData) {
          return {
            pages: [
              {
                data: {
                  list: [newMessage],
                },
                nextPage: undefined,
              },
            ],
            pageParams: [1],
          };
        }

        const newPages = [...oldData.pages];

        newPages[0] = {
          ...newPages[0],
          data: {
            ...newPages[0].data,
            list: [newMessage, ...(newPages[0].data.list || [])],
          },
        };

        return {
          ...oldData,
          pages: newPages,
        };
      });

      socket.emit('chat', newMessage, (error: any) => {
        if (error) {
          console.error('메세지 전송 실패', error);
          return;
        }
      });

      setMessage('');

      socket.emit('stopped_typing', chat.id);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full relative">
      <input
        className="lg:w-full lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] text-[1.8rem] font-medium text-black-400 focus:outline-none "
        type="text"
        value={message}
        onChange={e => {
          setMessage(e.target.value);
          handleTyping();
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button
        className={`absolute right-[1.6rem] top-1/2 -translate-y-1/2  ${message ? 'block' : 'hidden'}`}
        onClick={handleSubmit}
      >
        <Image src={send_btn} alt="채팅 전송 버튼" width={32} height={32} />
      </button>
    </div>
  );
}
