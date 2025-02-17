'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getChatListData } from '@/api/chatService';
import { ChatListData } from '@/interfaces/Section/ChatListInterface';
import ChatCard from '../cards/ChatCard';

export default function ChatList() {
  const { ref, inView } = useInView();

  const {
    data: chatList,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatListData>({
    queryKey: ['chatList'],
    queryFn: ({ pageParam }) => {
      return getChatListData(pageParam as number, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <>
      {chatList
        ? chatList.pages.flatMap(page =>
            page.list.id.map((id: string) => (
              <div key={id}>
                <ChatCard id={id} />
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </>
  );
}
