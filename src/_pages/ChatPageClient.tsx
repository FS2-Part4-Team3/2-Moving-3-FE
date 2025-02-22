'use client';

import { useState } from 'react';
import ChatContent from '@/components/section/ChatContent';
import ChatList from '@/components/section/ChatList';

export default function ChatPageClient() {
  const [isChatList, setIsChatList] = useState(false);

  return (
    <div className="flex">
      <ChatList isChatList={isChatList} setIsChatList={setIsChatList} />
      <ChatContent isChatList={isChatList} setIsChatList={setIsChatList} />
    </div>
  );
}
