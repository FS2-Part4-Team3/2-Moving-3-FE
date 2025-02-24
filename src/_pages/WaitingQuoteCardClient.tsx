'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postMovesConfirm } from '@/api/MovesService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import type { WaitingQuoteCardClientProps } from '@/interfaces/Page/WaitingQuoteClientInterface';

export default function WaitingQuoteCardClient({ moveId, estimationId }: WaitingQuoteCardClientProps) {
  const router = useRouter();

  const confirmationMutation = useMutation({
    mutationFn: async () => {
      await postMovesConfirm(moveId, estimationId);
    },
    onSuccess: () => {
      alert('견적 확정되었습니다.');
    },
    onError: () => {
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleConfirm = async () => {
    confirmationMutation.mutate();
  };

  const handleViewDetail = () => {
    router.push(`/normal/my-quote/waiting/${estimationId}`);
  };

  return (
    <div className="w-full flex md:flex-row sm:flex-col lg:gap-[1.1rem] sm:gap-[0.8rem]">
      <ButtonWrapper id="confirm-quote-button" onClick={handleConfirm}>
        <ButtonWrapper.Button className="lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] p-[1.6rem] w-full font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white flex items-center justify-center">
          견적 확정하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
      <ButtonWrapper id="view-detail-button" onClick={handleViewDetail}>
        <ButtonWrapper.Button className="border border-blue-300 bg-white lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] py-[1.6rem] px-[2.4rem] w-full font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-blue-300 flex items-center justify-center">
          상세보기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
