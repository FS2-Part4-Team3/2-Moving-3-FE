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

jest.mock('../modal/AddressModal', () => {
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
    expect(screen.getByTestId('출발지 선택하기')).toBeInTheDocument();
    expect(screen.getByTestId('도착지 선택하기')).toBeInTheDocument();
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

    const modifyButtons = screen.getByText('수정하기');
    expect(modifyButtons).toHaveLength(2);
  });

  it('calls handleSubmit when clicking on submit button', () => {
    render(<AddressCard {...defaultProps} />);

    const submitButton = screen.getByText('견적 확정하기');
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('updates regions when modifying addresses', () => {
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
  });
});
