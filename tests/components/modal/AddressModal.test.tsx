import { fireEvent, render, screen } from '@testing-library/react';
import { type Address } from 'react-daum-postcode';
import AddressModal from '@/components/modal/AddressModal';

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

describe('AddressModal Component', () => {
  const mockHandleModalClose = jest.fn();
  const mockSetRegions = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render departure modal', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={true}
        isArrivalModalOpen={false}
        setRegions={mockSetRegions}
      />,
    );

    expect(screen.getByText('출발지를 선택해주세요')).toBeInTheDocument();
    expect(screen.getByTestId('daum-postcode')).toBeInTheDocument();
    expect(screen.getByText('선택완료')).toBeInTheDocument();
  });

  it('render arrival modal', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={false}
        isArrivalModalOpen={true}
        setRegions={mockSetRegions}
      />,
    );

    expect(screen.getByText('도착지를 선택해주세요')).toBeInTheDocument();
    expect(screen.getByTestId('daum-postcode')).toBeInTheDocument();
    expect(screen.getByText('선택완료')).toBeInTheDocument();
  });

  it('select departure address', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={true}
        isArrivalModalOpen={false}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('select-address'));

    const setRegionsCall = mockSetRegions.mock.calls[0][0];
    const result = setRegionsCall({ start: '', arrival: '' });

    expect(result).toEqual({
      start: 'Seoul, Gangnam-gu',
      arrival: '',
    });
    expect(mockHandleModalClose).toHaveBeenCalled();
  });

  it('select arrival address', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={false}
        isArrivalModalOpen={true}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('select-address'));

    const setRegionsCall = mockSetRegions.mock.calls[0][0];
    const result = setRegionsCall({ start: '', arrival: '' });

    expect(result).toEqual({
      start: '',
      arrival: 'Seoul, Gangnam-gu',
    });
    expect(mockHandleModalClose).toHaveBeenCalled();
  });

  it('close departure modal', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={true}
        isArrivalModalOpen={false}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockHandleModalClose).toHaveBeenCalled();
  });

  it('close arrival modal', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={false}
        isArrivalModalOpen={true}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockHandleModalClose).toHaveBeenCalled();
  });

  it('preserve current state when selecting departure address', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={true}
        isArrivalModalOpen={false}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('select-address'));

    const setRegionsCall = mockSetRegions.mock.calls[0][0];
    const result = setRegionsCall({
      start: 'Existing Departure',
      arrival: 'Existing Arrival',
    });

    expect(result).toEqual({
      start: 'Seoul, Gangnam-gu',
      arrival: 'Existing Arrival',
    });
  });

  it('preserve current state when selecting arrival address', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={false}
        isArrivalModalOpen={true}
        setRegions={mockSetRegions}
      />,
    );

    fireEvent.click(screen.getByTestId('select-address'));

    const setRegionsCall = mockSetRegions.mock.calls[0][0];
    const result = setRegionsCall({
      start: 'Existing Departure',
      arrival: 'Existing Arrival',
    });

    expect(result).toEqual({
      start: 'Existing Departure',
      arrival: 'Seoul, Gangnam-gu',
    });
  });

  it('render empty header', () => {
    render(
      <AddressModal
        handleModalClose={mockHandleModalClose}
        isStartModalOpen={false}
        isArrivalModalOpen={false}
        setRegions={mockSetRegions}
      />,
    );

    const header = screen.getByTestId('modal-header');
    expect(header.textContent).toBe('');
  });
});
