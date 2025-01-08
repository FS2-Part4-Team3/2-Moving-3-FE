import { ModalWrapper } from "../common/headless/Modal";

export default function SendQuotationModal() {
  const handleCloseModal = () => {};

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <ModalWrapper.Header>견적 보내기</ModalWrapper.Header>
      <ModalWrapper.Content>
        <div className="flex flex-col gap-[3.2rem]">
          <p>테스트</p>
        </div>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={false}>견적 보내기</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
