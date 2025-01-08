import { ModalWrapper } from "../common/headless/Modal";

export default function SendQuotationModal() {
  const handleCloseModal = () => {};

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <ModalWrapper.Header>견적 보내기</ModalWrapper.Header>
      <ModalWrapper.Content>
        <p>테스트</p>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={false}>견적 보내기</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
