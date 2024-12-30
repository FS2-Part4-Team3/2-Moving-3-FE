"use client";

import { ModalWrapper } from "@/components/common/headless/Modal";

export default function Home() {
  return (
    <div>
      <ModalWrapper onClose={() => console.log("모달 닫기")}>
        <ModalWrapper.Header>모달 제목</ModalWrapper.Header>
        <ModalWrapper.Content>
          <p>모달 내용이 여기에 들어갑니다.</p>
        </ModalWrapper.Content>
        <ModalWrapper.Footer isDisabled={false}>버튼 확인</ModalWrapper.Footer>
      </ModalWrapper>
    </div>
  );
}
