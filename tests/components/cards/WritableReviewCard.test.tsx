import { EstimationItem } from '@/interfaces/Card/NormalReviewCardInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';

//Mock the next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

//Mock child components
jest.mock('@/components/chips/MovingTypeChips', () => ({
  __esModule: true,
  default: ({ type }: { type: string }) => <div data-testid={`moving-type-chip-${type}`}>{type}</div>,
}));

jest.mock('@/components/modal/WritingReviewModal', () => ({
  __esModule: true,
  default: ({ estimation, setIsModalOpen }: { estimation: EstimationItem; setIsModalOpen: (isOpen: boolean) => void }) => (
    <div data-testid="writing-review-modal">
      Modal Content
      <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
    </div>
  ),
}));

//Mock utility functions
jest.mock('@/utils/Format', () => ({
  DateWithoutDayWeeKFormat: jest.fn(),
  priceFormat: jest.fn(),
}));
