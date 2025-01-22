import { fireEvent, render, screen } from '@testing-library/react';
import DaumPostcode, { type Address } from 'react-daum-postcode';
import AddressModal from '@/components/modal/AddressModal';
import type { AddressModalProps } from '@/interfaces/Modal/AddressModalInterface';

// Mocking ModalWrapper
jest.mock('@/components/common/headless/Modal', () => {
  const MockModalWrapper = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
    <div data-testid="modal-wrapper">
      <button onClick={onClose} data-testid="close-button">
        Close
      </button>
      {children}
    </div>
  );

  MockModalWrapper.Header = ({ children }: { children: React.ReactNode }) => <div data-testid="modal-header">{children}</div>;

  MockModalWrapper.Content = ({ children }: { children: React.ReactNode }) => <div data-testid="modal-content">{children}</div>;

  MockModalWrapper.Footer = ({ children, isDisabled }: { children: React.ReactNode; isDisabled: boolean }) => (
    <div data-testid="modal-footer">{children}</div>
  );

  return {
    ModalWrapper: MockModalWrapper,
  };
});

// Mocking DaumPostcode
jest.mock('react-daum-postcode', () => {
  return jest.fn().mockImplementation(({ onComplete }: { onComplete: (address: Address) => void }) => (
    <div data-testid="daum-postcode">
      <button onClick={() => onComplete({ address: 'Seoul, Gangnam-gu' } as Address)} data-testid="select-address">
        Select Address
      </button>
    </div>
  ));
});
