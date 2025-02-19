'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { getChatListData } from '@/api/ChatsService';
import { ChatListData } from '@/interfaces/Section/ChatListInterface';
import { setChat } from '@/store/slices/chatSlice';
import ChatCard from '../cards/ChatCard';

export default function ChatList() {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (chatList?.pages.length) {
      const lastId = chatList.pages.flatMap(page => page.list).shift();
      if (lastId) {
        dispatch(setChat({ id: lastId }));
      }
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div className="lg:w-[45rem] md:w-[28rem] sm:w-[37rem] h-screen flex flex-col border-r-[0.3rem] border-line-100">
      <p className="lg:block md:hidden sm:hidden text-[2.4rem] font-semibold ml-[2rem] mt-[2rem]">메세지 목록</p>
      {chatList
        ? chatList.pages.flatMap(page =>
            page.list.map(id => (
              <div key={id}>
                <ChatCard id={id} />
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
