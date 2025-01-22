import { ReactNode } from 'react';

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
