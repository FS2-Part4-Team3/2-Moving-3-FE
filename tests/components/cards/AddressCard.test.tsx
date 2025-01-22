import { fireEvent, render, screen } from '@testing-library/react';
import AddressCard from '@/components/cards/AddressCard';
import type { AddressCardProps } from '@/interfaces/Card/AddressCardInterface';

// ButtonWrapper 모킹
jest.mock('@/components/common/headless/Button', () => {
  const ButtonComponent = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  );

  const ButtonWrapper = ({ children, onClick, id }: { children: React.ReactNode; onClick?: () => void; id?: string }) => {
    return (
      <div data-testid={id} onClick={onClick}>
        {children}
      </div>
    );
  };

  ButtonWrapper.Button = ButtonComponent;

  return { ButtonWrapper };
});

// AddressModal 모킹
jest.mock('@/components/modal/AddressModal', () => {
  return function MockAddressModal({
    handleModalClose,
    setRegions,
    isStartModalOpen,
    isArrivalModalOpen,
  }: {
    handleModalClose: () => void;
    setRegions: (prev: any) => void;
    isStartModalOpen?: boolean;
    isArrivalModalOpen?: boolean;
  }) {
    return (
      <div data-testid={isStartModalOpen ? 'start-modal' : 'arrival-modal'}>
        <button
          onClick={() => {
            setRegions((prev: any) => ({
              ...prev,
              ...(isStartModalOpen ? { start: '서울시' } : { arrival: '부산시' }),
            }));
            handleModalClose();
          }}
        >
          선택
        </button>
      </div>
    );
  };
});

describe('AddressCard component', () => {
  const mockHandleSubmit = jest.fn();
  const mockSetRegions = jest.fn();
  const defaultProps: AddressCardProps = {
    regions: {
      start: '',
      arrival: '',
    },
    setRegions: mockSetRegions,
    handleSubmit: mockHandleSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render the component correctly', () => {
    render(<AddressCard {...defaultProps} />);

    expect(screen.getByText('출발지')).toBeInTheDocument();
    expect(screen.getByText('도착지')).toBeInTheDocument();
    expect(screen.getByText('출발지 선택하기')).toBeInTheDocument();
    expect(screen.getByText('도착지 선택하기')).toBeInTheDocument();
    expect(screen.getByText('견적 확정하기')).toBeInTheDocument();
  });

  it('opens start modal when clicking on start address button', () => {
    render(<AddressCard {...defaultProps} />);

    const startButton = screen.getByText('출발지 선택하기');
    fireEvent.click(startButton);

    expect(screen.getByTestId('start-modal')).toBeInTheDocument();
  });

  it('opens arrival modal when clicking on arrival address button', () => {
    render(<AddressCard {...defaultProps} />);

    const arrivalButton = screen.getByText('도착지 선택하기');
    fireEvent.click(arrivalButton);

    expect(screen.getByTestId('arrival-modal')).toBeInTheDocument();
  });

  it('closes start modal when selecting an address', () => {
    render(<AddressCard {...defaultProps} />);

    const startButton = screen.getByText('출발지 선택하기');
    fireEvent.click(startButton);

    const selectButton = screen.getByText('선택');
    fireEvent.click(selectButton);

    expect(screen.queryByTestId('start-modal')).not.toBeInTheDocument();
  });

  it('close arrival modal when selecting an address', () => {
    render(<AddressCard {...defaultProps} />);

    const arrivalButton = screen.getByText('도착지 선택하기');
    fireEvent.click(arrivalButton);

    const selectButton = screen.getByText('선택');
    fireEvent.click(selectButton);

    expect(screen.queryByTestId('arrival-modal')).not.toBeInTheDocument();
  });

  it('shows modification button when address are selected', () => {
    const propWithAddresses: AddressCardProps = {
      ...defaultProps,
      regions: {
        start: '서울시',
        arrival: '부산시',
      },
    };

    render(<AddressCard {...propWithAddresses} />);

    const modifyButtons = screen.getAllByText('수정하기');
    expect(modifyButtons).toHaveLength(2);
  });

  it('calls handleSubmit when clicking on submit button', () => {
    render(<AddressCard {...defaultProps} />);

    const submitButton = screen.getByText('견적 확정하기');
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('updates regions when modifying start addresses', () => {
    const propWithAddresses: AddressCardProps = {
      ...defaultProps,
      regions: {
        start: '서울시',
        arrival: '부산시',
      },
    };

    render(<AddressCard {...propWithAddresses} />);

    const modifyButtons = screen.getAllByText('수정하기');
    fireEvent.click(modifyButtons[0]);

    expect(mockSetRegions).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = mockSetRegions.mock.calls[0][0];
    const result = updateFunction({ start: '서울시', arrival: '부산시' });
    expect(result).toEqual({ start: '', arrival: '부산시' });
  });

  it('updates regions when modifying arrival address', () => {
    const propsWithAddresses: AddressCardProps = {
      ...defaultProps,
      regions: {
        start: '서울시',
        arrival: '부산시',
      },
    };

    render(<AddressCard {...propsWithAddresses} />);

    const modifyButtons = screen.getAllByText('수정하기');
    fireEvent.click(modifyButtons[1]);

    expect(mockSetRegions).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = mockSetRegions.mock.calls[0][0];
    const result = updateFunction({ start: '서울시', arrival: '부산시' });
    expect(result).toEqual({ start: '서울시', arrival: '' });
  });

  it('displays selected address', () => {
    const propWithAddresses: AddressCardProps = {
      ...defaultProps,
      regions: {
        start: '서울시',
        arrival: '부산시',
      },
    };

    render(<AddressCard {...propWithAddresses} />);

    expect(screen.getByText('서울시')).toBeInTheDocument();
    expect(screen.getByText('부산시')).toBeInTheDocument();
  });
});
