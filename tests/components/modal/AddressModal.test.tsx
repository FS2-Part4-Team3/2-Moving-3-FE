import { ReactNode } from 'react';
import { Address } from 'react-daum-postcode';

jest.mock('@/components/common/headless/Modal', () => ({
  ModalWrapper: ({ children, onClose }: { children: ReactNode; onClose: () => void }) => (
    <div>
      <div data-testid="modal-header">{children}</div>
      <div data-testid="modal-content">{children}</div>
      <div data-testid="modal-footer">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ),
}));

jest.mock('react-daum-postcode', () => {
  DaumPostcode: ({ onComplete }: { onComplete: (address: Partial<Address>) => void }) => (
    <div>
      <button onClick={() => onComplete({ address: '서울특별시 강남구' })}>Complete</button>
    </div>
  );
});
