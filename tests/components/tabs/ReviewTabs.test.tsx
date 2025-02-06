import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import ReviewTabs from '@/components/Tabs/ReviewTabs';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

//Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}></a>,
}));

describe('ReviewTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both tab options', () => {
    (usePathname as jest.Mock).mockReturnValue('/normal/my-page/writable-review');
    render(<ReviewTabs />);

    expect(screen.getByText('작성 가능한 리뷰')).toBeInTheDocument();
    expect(screen.getByText('내가 작성한 리뷰')).toBeInTheDocument();
  });

  it('selects "able" tab on writable-review path', () => {
    (usePathname as jest.Mock).mockReturnValue('/normal/my-page/writable-review');
    render(<ReviewTabs />);

    const ableTab = screen.getByText('작성 가능한 리뷰').parentElement;
    expect(ableTab).toHaveClass('text-black-400', 'border-blue-400');
  });

  it('selects "my" on written-review path', () => {
    (usePathname as jest.Mock).mockReturnValue('/normal/my-page/written-review');
    render(<ReviewTabs />);

    const myTab = screen.getByText('내가 작성한 리뷰').parentElement;
    expect(myTab).toHaveClass('text-black-400', 'border-blue-400');
  });
});
