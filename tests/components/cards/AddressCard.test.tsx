import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddressCard from '@/components/cards/AddressCard';

describe('AddressCard component', () => {
  const mockHandleSubmit = jest.fn();
  const mockRegions = jest.fn();
  const regions = { start: '', arrival: '' };

  it('render the component correctly', () => {
    render(<AddressCard regions={regions} setRegions={mockRegions} handleSubmit={mockHandleSubmit} />);

    expect(screen.getByText('출발지')).toBeInTheDocument();
    expect(screen.getByText('도착지')).toBeInTheDocument();
    expect(screen.getByText('견적 확정하기')).toBeInTheDocument();
  });

  it('opens and closes the 출발지 modal', async () => {
    render(<AddressCard regions={regions} setRegions={mockRegions} handleSubmit={mockHandleSubmit} />);

    const user = userEvent.setup();
    const 출발지Button = screen.getByText('출발지 선택하기');

    await user.click(출발지Button);
    expect(screen.getByText('출발지를 선택해주세요'));

    const closeButton = screen.getAllByRole('image', { name: /close/i })[0];
    user.click(closeButton);
    expect(screen.queryByText('출발지를 선택해주세요')).not.toBeInTheDocument();
  });

  it('opens and close the 도착지 modal', async () => {
    render(<AddressCard regions={regions} setRegions={mockRegions} handleSubmit={mockHandleSubmit} />);

    const user = userEvent.setup();
    const 도착지Button = screen.getByText('도착지 선택하기');

    await user.click(도착지Button);
    expect(screen.getByText('도착지를 선택해주세요'));

    const closeButton = screen.getAllByRole('image', { name: /close/i })[0];
    user.click(closeButton);
    expect(screen.queryByText('도착지를 선택해주세요')).not.toBeInTheDocument();
  });
});
