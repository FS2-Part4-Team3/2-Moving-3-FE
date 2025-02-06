jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ onClick, alt }: any) => <img onClick={onClick} alt={alt} data-testid="star-image" />,
}));

jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: any) => <div data-testid="moving-type-chips">{type}</div>,
}));

jest.mock('@/components/common/headless/Modal', () => ({
  ModalWrapper: {
    Header: ({ children }: any) => <div data-testid="modal-header">{children}</div>,
    Content: ({ children }: any) => <div data-testid="modal-content">{children}</div>,
    Footer: ({ children, isDisabled }: any) => (
      <button disabled={isDisabled} data-testid="modal-footer">
        {children}
      </button>
    ),
  },
}));

const mockEstimation = {
  drvier: {
    name: '홍길동',
    image: '/drvier.jpg',
  },
  moveInfo: {
    date: '2024-01-22',
    serviceType: 'SMALL',
  },
  estimationInfo: {
    price: 150000,
  },
};
