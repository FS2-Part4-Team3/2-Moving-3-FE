import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MyQuoteReceivedCard from '@/components/cards/MyQuoteReceivedCard';

describe('MyQuoteReceivedToast', () => {
  it('정상적으로 렌더링되는지 확인.', () => {
    render(<MyQuoteReceivedCard />);

    // 이미지
    const image = screen.getByAltText('info');
    expect(image).toBeInTheDocument();

    // 텍스트
    const text = screen.getByText('확정하지 않은 견적이에요!');
    expect(text).toBeInTheDocument();
  });
});
