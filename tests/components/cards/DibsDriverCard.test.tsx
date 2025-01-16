import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import DibsDriverCard from '@/components/cards/DibsDriverCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/chips/SmallMovingChips', () => {
  return function MockSmallTypeChips({ type }: { type: string }) {
    return <div data-testid="moving-type-chip">{type}</div>;
  };
});
