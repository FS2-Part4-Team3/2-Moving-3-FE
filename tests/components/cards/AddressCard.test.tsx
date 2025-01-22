import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddressCard from '@/components/cards/AddressCard';
import { AddressCardProps } from '@/interfaces/Card/AddressCardInterface';

interface AddressModalProps {
  handleModalClose: () => void;
  setRegions: AddressCardProps['setRegions'];
  isStartModalOpen?: boolean;
  isArrivalModalOpen?: boolean;
}

jest.mock('@/components/modal/AddressModal', () => {
  return function MockAddressModal({ handleModalClose, setRegions }: AddressModalProps) {
    return (
      <div data-testid="mock-address-modal">
        <button
          onClick={() => {
            setRegions(prev => ({
              ...prev,
              start: '서울시',
              arrival: '부산시',
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

    expect(screen.getByTestId('mock-address-modal')).toBeInTheDocument();
  });

  it('opens arrival modal when clicking on arrival address button', () => {
    render(<AddressCard {...defaultProps} />);

    const arrivalButton = screen.getByText('도착지 선택하기');
    fireEvent.click(arrivalButton);

    expect(screen.getByTestId('mock-address-modal')).toBeInTheDocument();
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
    expect(result.start).toBe('');
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
    expect(result.arrival).toBe('');
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

  it('closes start modal when selecting an address', () => {
    render(<AddressCard {...defaultProps} />);

    const startButton = screen.getByText('출발지 선택하기');
    fireEvent.click(startButton);

    const selectButton = screen.getByText('선택');
    fireEvent.click(selectButton);

    expect(screen.queryByTestId('mock-address-modal')).not.toBeInTheDocument();
  });

  it('close arrival modal when selecting an address', () => {
    render(<AddressCard {...defaultProps} />);

    const arrivalButton = screen.getByText('도착지 선택하기');
    fireEvent.click(arrivalButton);

    const selectButton = screen.getByText('선택');
    fireEvent.click(selectButton);

    expect(screen.queryByTestId('mock-address-modal')).not.toBeInTheDocument();
  });

  it('updates both start and arrival addresses when clicking modify button', () => {
    const propWithAddress: AddressCardProps = {
      ...defaultProps,
      regions: {
        start: '서울시',
        arrival: '부산시',
      },
    };

    render(<AddressCard {...propWithAddress} />);

    const modifyButtons = screen.getAllByText('수정하기');
    fireEvent.click(modifyButtons[0]);
    const selectButton = screen.getByText('선택');
    fireEvent.click(selectButton);

    expect(mockSetRegions).toHaveBeenCalled();
    const updateFunction = mockSetRegions.mock.calls[0][0];
    const result = updateFunction({ start: '서울시', arrival: '부산시' });
    expect(result).toEqual({ start: '', arrival: '부산시' });
  });
});
