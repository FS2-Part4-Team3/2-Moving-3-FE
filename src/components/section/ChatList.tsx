'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { getChatListData } from '@/api/ChatsService';
import { ChatListData, ChatProps } from '@/interfaces/Section/ChatListInterface';
import { setChat, setMoves } from '@/store/slices/chatSlice';
import { RootState } from '@/store/store';
import { formatDateTime } from '@/utils/Format';
import ChatCard from '../cards/ChatCard';

export default function ChatList({ isChatList, setIsChatList }: ChatProps) {
  const { ref, inView } = useInView();
  const chat = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const krType = (serviceType: string) => {
    switch (serviceType) {
      case 'HOME':
        return '가정이사';
      case 'SMALL':
        return '소형이사';
      default:
        return '사무실이사';
    }
  };

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

  // useEffect(() => {
  //   if (chatList?.pages.length) {
  //     const lastId = chatList.pages.flatMap(page => page.list).shift();
  //     if (lastId) {
  //       dispatch(setChat({ id: lastId }));
  //     }
  //   }
  // }, [chatList?.pages]);

  useEffect(() => {
    chatList?.pages.map(chats => {
      if (chats.moves) {
        chats.moves.map(move => {
          if (move.ownerId === chat.id) {
            dispatch(
              setMoves({
                moveId: move.moveId,
                serviceType: krType(move.serviceType),
                date: formatDateTime(move.date),
                fromAddress: move.fromAddress,
                toAddress: move.toAddress,
                ownerId: move.ownerId,
              }),
            );
          }
        });
      }
    });
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chatList'] });
  }, [queryClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div
      className={`lg:block ${isChatList ? 'md:block sm:block' : 'md:hidden sm:hidden'} overflow-y-auto overflow-x-hidden lg:w-[45rem] md:w-screen sm:w-screen h-screen flex flex-col border-r-[0.3rem] border-line-100`}
    >
      <p className="lg:block md:hidden sm:hidden text-[2.4rem] font-semibold ml-[2rem] mt-[2rem]">메세지 목록</p>
      {chatList
        ? chatList.pages.flatMap(page =>
            page.list.map(id => (
              <div key={id}>
                <ChatCard isChatList={isChatList} setIsChatList={setIsChatList} id={id} />
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
