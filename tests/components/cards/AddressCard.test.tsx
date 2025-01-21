import { render, screen } from '@testing-library/react';
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
});
