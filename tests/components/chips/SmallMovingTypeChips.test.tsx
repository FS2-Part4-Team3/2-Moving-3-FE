import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SmallMovingTypeChips from '@/components/chips/SmallMovingTypeChips';

describe('SmallMovingTypeChips', () => {
  const renderChip = (type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING') => {
    render(<SmallMovingTypeChips type={type} />);
  };

  it('render SMALL type correctly', () => {
    renderChip('SMALL');

    const chip = screen.getByText(/소형/);
    expect(chip).toBeInTheDocument();
  });

  it('render HOME type correctly', () => {
    renderChip('HOME');

    const chip = screen.getByText(/가정/);
    expect(chip).toBeInTheDocument();
  });

  it('render OFFICE type correctly', () => {
    renderChip('OFFICE');

    const chip = screen.getByText(/사무실/);
    expect(chip).toBeInTheDocument();
  });

  it('render APPOINTMENT type correctly', () => {
    renderChip('APPOINTMENT');

    const chip = screen.getByText(/지정/);
    expect(chip).toBeInTheDocument();
  });

  it('render WAITING type correctly', () => {
    renderChip('WAITING');

    const chip = screen.getByText(/대기/);
    expect(chip).toBeInTheDocument();
  });
});
