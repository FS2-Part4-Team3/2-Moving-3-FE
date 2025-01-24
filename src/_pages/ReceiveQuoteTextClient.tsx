'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ReceiveQuoteTextClient() {
  const { movesList } = useSelector((state: RootState) => state.moves);

  if (!movesList) {
    return <div>Loading...</div>;
  }

  return <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">전체 {movesList.totalCount}건</p>;
}
