'use client';

import { useRouter } from 'next/navigation';
import type { SpecifiedQuotationFailureModalProps } from '@/interfaces/Modal/SpecifiedQuotationFailureModalInterface';
import { ButtonWrapper } from '../common/headless/Button';
import { ModalWrapper } from '../common/headless/Modal';

export default function SpecifiedQuotationFailureModal({ onClose }: SpecifiedQuotationFailureModalProps) {
  const router = useRouter();

  const handleRequestQuotation = () => {
    router.push('/normal/request-quote');
  };

  return (
    <ModalWrapper onClose={onClose} className="sm:px-[1.6rem] sm:gap-[3rem] sm:py-[2.4rem]">
      <ModalWrapper.Header>지정 견적 요청하기</ModalWrapper.Header>
      <ModalWrapper.Content>
        <p className="text-black-300 font-medium lg:text-[1.8rem] sm:text-[1.6rem] lg:leading-[2.6rem] sm:leading-[2.4rem]">
          일반 견적 요청을 먼저 진행해 주세요.
        </p>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={false}>
        <ButtonWrapper.Button onClick={handleRequestQuotation}>일반 견적 요청하기</ButtonWrapper.Button>
      </ModalWrapper.Footer>
    </ModalWrapper>
  );
}
