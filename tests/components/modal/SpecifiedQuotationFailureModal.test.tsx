import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import SpecifiedQuotationFailureModal from '@/components/modal/SpecifiedQuotationFailureModal';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SpecifiedQuotationFailureModal', () => {
  const mockOnClose = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('모달이 정상적으로 렌더링되어야 한다', () => {
    render(<SpecifiedQuotationFailureModal onClose={mockOnClose} />);

    expect(screen.getByText('지정 견적 요청하기')).toBeInTheDocument();
    expect(screen.getByText('일반 견적 요청을 먼저 진행해 주세요.')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: '일반 견적 요청하기' });
    expect(buttons[0]).toBeInTheDocument();
  });

  // it('버튼 클릭 시 /normal/request-quote 페이지로 이동해야 한다', async () => {
  //   render(<SpecifiedQuotationFailureModal onClose={mockOnClose} />);

  //   const button = screen.getByRole('button', { name: '일반 견적 요청하기' });
  //   await userEvent.click(button);

  //   expect(mockPush).toHaveBeenCalledWith('/normal/request-quote');
  // });

  // it('onClose가 정상적으로 호출되어야 한다', async () => {
  //   render(<SpecifiedQuotationFailureModal onClose={mockOnClose} />);

  //   const modalHeader = screen.getByText('지정 견적 요청하기');
  //   await userEvent.click(modalHeader);

  //   expect(mockOnClose).toHaveBeenCalled();
  // });
});
