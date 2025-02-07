import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyQuoteReceivedToast from '@/components/toasts/MyQuoteReceivedToast';

describe('MyQuoteReceivedToast', () => {
  it('정상적으로 렌더링되는지 확인.', () => {
    render(<MyQuoteReceivedToast />);

    // 이미지
    const image = screen.getByAltText('info');
    expect(image).toBeInTheDocument();

    // 텍스트
    const text = screen.getByText('확정하지 않은 견적이에요!');
    expect(text).toBeInTheDocument();
  });
});
