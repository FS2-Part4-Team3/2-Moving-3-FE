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
  const regions = { start: '', arrival: '' };

  it('render the component correctly', () => {
    render(<AddressCard regions={regions} setRegions={mockSetRegions} handleSubmit={mockHandleSubmit} />);

    expect(screen.getByText('출발지')).toBeInTheDocument();
    expect(screen.getByText('도착지')).toBeInTheDocument();
    expect(screen.getByText('견적 확정하기')).toBeInTheDocument();
  });

  it('opens and closes the 출발지 modal and modifies start region', async () => {
    render(<AddressCard regions={regions} setRegions={mockSetRegions} handleSubmit={mockHandleSubmit} />);

    const user = userEvent.setup();

    const 출발지Button = screen.getByText('출발지 선택하기');
    await user.click(출발지Button);

    expect(screen.getByText('출발지를 선택해주세요')).toBeInTheDocument();

    const closeButton = screen.getAllByRole('image', { name: /close/i })[0];
    user.click(closeButton);

    expect(screen.queryByText('출발지를 선택해주세요')).not.toBeInTheDocument();

    mockSetRegions.mockImplementationOnce(callback => callback({ start: '서울', arrival: '' }));
    expect(mockSetRegions).toHaveBeenCalledWith(expect.any(Function));
  });

  it('opens and close the 도착지 modal and modifies arrival region', async () => {
    render(<AddressCard regions={regions} setRegions={mockSetRegions} handleSubmit={mockHandleSubmit} />);

    const user = userEvent.setup();

    const 도착지Button = screen.getByText('도착지 선택하기');
    await user.click(도착지Button);

    expect(screen.getByText('도착지를 선택해주세요')).toBeInTheDocument();

    const closeButton = screen.getAllByRole('image', { name: /close/i })[0];
    user.click(closeButton);

    expect(screen.queryByText('도착지를 선택해주세요')).not.toBeInTheDocument();

    mockSetRegions.mockImplementationOnce(callback => callback({ start: '', arrival: '인천' }));

    expect(mockSetRegions).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls handleSubmit on "견적 확정하기" button click', () => {
    render(<AddressCard regions={regions} setRegions={mockSetRegions} handleSubmit={mockHandleSubmit} />);

    const submitButton = screen.getByText('견적 확정하기');
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
