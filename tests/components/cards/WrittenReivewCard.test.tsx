// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock components
jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => <div data-testid="moving-type-chip">{type}</div>,
}));
