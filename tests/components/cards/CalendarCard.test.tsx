import { ReactNode } from 'react';

// Mocking ButtonWrapper
jest.mock('@/components/common/headless/Button', () => {
  const MockButtonWrapper = ({ children, id }: { children: ReactNode; id: string }) => <div data-testid={id}>{children}</div>;

  MockButtonWrapper.Button = ({
    children,
    onClick,
    disabled,
    className,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }) => (
    <button data-testid="calendar-button" onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );

  return {
    ButtonWrapper: MockButtonWrapper,
  };
});
