import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MovingTypeChips from '@/components/chips/MovingTypeChips';
import { priceFormat } from '@/utils/Format';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Moving type chips', () => {
  it('render SMALL type correctly', () => {
    render(<MovingTypeChips type="SMALL" />);
    expect(screen.getByText('소형이사')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toHaveAttribute('src', expect.stringContaining('small_mov'));
  });

  it('render HOME type correctly', () => {
    render(<MovingTypeChips type="HOME" />);
    expect(screen.getByText('가정이사')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toHaveAttribute('src', expect.stringContaining('home_mov'));
  });

  it('render OFFICE type correctly', () => {
    render(<MovingTypeChips type="OFFICE" />);
    expect(screen.getByText('사무실이사')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toHaveAttribute('src', expect.stringContaining('company_mov'));
  });

  it('render APPOINTMENT type correctly', () => {
    render(<MovingTypeChips type="APPOINTMENT" />);
    expect(screen.getByText('지정 견적 요청')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toHaveAttribute('src', expect.stringContaining('appointment'));
  });

  it('render WAITING type correctly', () => {
    render(<MovingTypeChips type="WAITING" />);
    expect(screen.getByText('견적 대기')).toBeInTheDocument();
  });

  it('render RECEIVED type correctly', () => {
    render(<MovingTypeChips type="RECEIVED" />);
    expect(screen.getByText('확정 견적')).toBeInTheDocument();
  });
});
