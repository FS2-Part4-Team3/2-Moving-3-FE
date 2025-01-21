import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MovingTypeChips from '@/components/chips/MovingTypeChips';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('MovingTypeChips', () => {
  it('renders small moving chip correctly', () => {
    render(<MovingTypeChips type="SMALL" />);

    expect(screen.getByText('소형이사')).toBeInTheDocument();
    const images = screen.getAllByAltText('logo');
    expect(images).toHaveLength(2);
  });

  it('renders home moving chip correctly', () => {
    render(<MovingTypeChips type="HOME" />);

    expect(screen.getByText('가정이사')).toBeInTheDocument();
    const images = screen.getAllByAltText('logo');
    expect(images).toHaveLength(2);
  });

  it('renders office moving chip correctly', () => {
    render(<MovingTypeChips type="OFFICE" />);

    expect(screen.getByText('사무실이사')).toBeInTheDocument();
    const images = screen.getAllByAltText('logo');
    expect(images).toHaveLength(2);
  });

  it('renders appointment chip when type is APPOINTMENT', () => {
    render(<MovingTypeChips type="APPOINTMENT" />);

    expect(screen.getByText('지정 견적 요청')).toBeInTheDocument();
    const images = screen.getAllByAltText('logo');
    expect(images).toHaveLength(2);
  });

  it('renders appointment chip when specificRequest is true', () => {
    render(<MovingTypeChips type="APPOINTMENT" />);

    expect(screen.getByText('지정 견적 요청')).toBeInTheDocument();
    const images = screen.getAllByAltText('logo');
    expect(images).toHaveLength(2);
  });

  it('renders waiting status chip correctly', () => {
    render(<MovingTypeChips type="WAITING" />);

    expect(screen.getByText('견적 대기')).toBeInTheDocument();
  });

  it('renders received status chip correctly', () => {
    render(<MovingTypeChips type="RECEIVED" />);

    expect(screen.getByText('확정 견적')).toBeInTheDocument();
  });
});
