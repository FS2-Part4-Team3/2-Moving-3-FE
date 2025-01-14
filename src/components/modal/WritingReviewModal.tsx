'use client';

import { useState } from 'react';
import type { WritingReviewModalProps } from '@/interfaces/Modal/WritingReveiwModalInterface';
import { ModalWrapper } from '../common/headless/Modal';

export default function WritingReviewModal({ estimation, review }: WritingReviewModalProps) {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div>
      <ModalWrapper onClose={() => setIsClosed(true)}>
        <ModalWrapper.Header>리뷰 쓰기</ModalWrapper.Header>
        <ModalWrapper.Content>
          <div></div>
        </ModalWrapper.Content>
        <ModalWrapper.Footer isDisabled>리뷰 등록</ModalWrapper.Footer>
      </ModalWrapper>
    </div>
  );
}
