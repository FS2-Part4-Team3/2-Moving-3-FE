'use client';

import Image from 'next/image';
import { useState } from 'react';
import send_btn from '@/../public/assets/chat/send_btn.svg';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex w-full relative">
      <input
        className="lg:w-full lg:h-[6.4rem] rounded-[1.6rem] p-[1.4rem] text-[1.8rem] font-medium text-black-400 focus:outline-none "
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button className={`absolute right-[1.6rem] top-1/2 -translate-y-1/2  ${message ? 'block' : 'hidden'}`}>
        <Image src={send_btn} alt="채팅 전송 버튼" width={32} height={32} />
      </button>
    </div>
  );
}
