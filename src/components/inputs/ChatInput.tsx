'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import add_file from '@/../public/assets/chat/ic_add-file.svg';
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgDeleteClick = () => {
    setSelectedImg(null);
    setPreviewUrl('');
  };

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
    <div className="flex w-full relative items-center">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
      <div className="relative w-full flex items-center border rounded-[1.6rem] p-[1.4rem] bg-white">
        {previewUrl && (
          <div className="relative w-auto h-auto max-w-[120px] max-h-[120px] mr-3">
            <Image src={previewUrl} alt="추가된 이미지" width={100} height={100} className="rounded-lg" />
            <button
              onClick={handleImgDeleteClick}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        )}
        <input
          className={`w-full flex-grow text-[1.8rem] font-medium text-black-400 focus:outline-none bg-transparent resize-none ${!previewUrl && 'pl-[4rem]'}`}
          style={{
            minHeight: previewUrl ? '120px' : '40px',
          }}
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
      </div>
      {!previewUrl && (
        <button onClick={handleImgClick} className="absolute left-[1.6rem] top-1/2 -translate-y-1/2">
          <Image src={add_file} alt="이미지 추가" width={32} height={32} />
        </button>
      )}
      <button
        className={`absolute right-[1.6rem] top-1/2 -translate-y-1/2 ${message || selectedImg ? 'block' : 'hidden'}`}
        onClick={handleSubmit}
      >
        <Image src={send_btn} alt="채팅 전송 버튼" width={32} height={32} />
      </button>
    </div>
  );
}
