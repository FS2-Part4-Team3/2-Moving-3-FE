import DaumPostcode, { type Address } from 'react-daum-postcode';
import { type AddressModalProps } from '@/interfaces/Modal/AddressModalInterface';
import { ModalWrapper } from '../common/headless/Modal';

export default function AddressModal({ handleModalClose, isArrivalModalOpen, isStartModalOpen, setRegions }: AddressModalProps) {
  const handleClick = (address: Address) => {
    if (isStartModalOpen) {
      setRegions(prevState => ({ ...prevState, start: address.address }));
    }
    if (isArrivalModalOpen) {
      setRegions(prevState => ({ ...prevState, arrival: address.address }));
    }
    handleModalClose();
  };

  return (
    <ModalWrapper onClose={handleModalClose}>
      <ModalWrapper.Header>
        {isStartModalOpen ? '출발지를 선택해주세요' : isArrivalModalOpen ? '도착지를 선택해주세요' : ''}
      </ModalWrapper.Header>
      <ModalWrapper.Content>
        <DaumPostcode onComplete={handleClick} />
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled>선택완료</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
