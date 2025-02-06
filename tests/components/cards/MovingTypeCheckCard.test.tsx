// Mock ButtonWrapper component
jest.mock('@/components/common/headless/Button', () => ({
  ButtonWrapper: {
    Button: ({ children, onClick, disabled }: any) => (
      <button onClick={onClick} disabled={disabled} data-testid="complete-button">
        {children}
      </button>
    ),
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('MovingTypeCheckCard', () => {
  const mockSetMovingType = jest.fn();
  const mockSetIsMovingType = jest.fn();
  const mockSetViewMovingType = jest.fn();

  const defaultProps = {
    setMovingType: mockSetMovingType,
    setIsMovingType: mockSetIsMovingType,
    setViewMovingType: mockSetViewMovingType,
    initialMovingType: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
