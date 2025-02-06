import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ProfileChips } from '@/components/chips/ProfileChips';

const mockRegions = [
  { code: 'R1', name: '서울' },
  { code: 'R2', name: '경기' },
];

const mockMovingTypes = [
  { code: 'M1', type: '소형' },
  { code: 'M2', type: '가정' },
];

const mockStoreDriver = configureStore({
  reducer: {
    signIn: () => ({ type: 'driver' }),
  },
});

const mockStoreUser = configureStore({
  reducer: {
    signIn: () => ({ type: 'user' }),
  },
});

describe('ProfileChips', () => {
  const mockSetSelectedRegions = jest.fn();
  const mockSetSelectedMovingType = jest.fn();

  const defaultProps = {
    regions: mockRegions,
    movingTypes: mockMovingTypes,
    selectedRegions: [],
    selectedMovingType: [],
    setSelectedRegions: mockSetSelectedRegions,
    setSelectedMovingType: mockSetSelectedMovingType,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders regions and moving types', () => {
    render(
      <Provider store={mockStoreUser}>
        <ProfileChips {...defaultProps} />
      </Provider>,
    );
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('소형')).toBeInTheDocument();
  });

  it('handles single region selection for user', () => {
    render(
      <Provider store={mockStoreUser}>
        <ProfileChips {...defaultProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('서울'));
    expect(mockSetSelectedRegions).toHaveBeenCalledWith(['R1']);
  });

  it('handles multiple regions selection for driver', () => {
    render(
      <Provider store={mockStoreDriver}>
        <ProfileChips {...defaultProps} selectedRegions={['R1']} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('경기'));
    expect(mockSetSelectedRegions).toHaveBeenCalledWith(['R1', 'R2']);
  });

  it('handles single moving type selection', () => {
    render(
      <Provider store={mockStoreDriver}>
        <ProfileChips {...defaultProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('소형'));
    expect(mockSetSelectedMovingType).toHaveBeenCalledWith(['M1']);
  });

  it('handles multiple moving type selection', () => {
    render(
      <Provider store={mockStoreDriver}>
        <ProfileChips {...defaultProps} selectedMovingType={['M1']} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('가정'));
    expect(mockSetSelectedMovingType).toHaveBeenCalledWith(['M1', 'M2']);
  });

  it('deselects selected items', () => {
    render(
      <Provider store={mockStoreDriver}>
        <ProfileChips {...defaultProps} selectedRegions={['R1']} selectedMovingType={['M1']} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('서울'));
    expect(mockSetSelectedRegions).toHaveBeenCalledWith([]);

    fireEvent.click(screen.getByText('소형'));
    expect(mockSetSelectedMovingType).toHaveBeenCalledWith([]);
  });

  it('applies correct styles for selected items', () => {
    render(
      <Provider store={mockStoreDriver}>
        <ProfileChips {...defaultProps} selectedRegions={['R1']} selectedMovingType={['M1']} />
      </Provider>,
    );

    expect(screen.getByText('서울').parentElement).toHaveClass('bg-blue-50');
    expect(screen.getByText('소형').parentElement).toHaveClass('bg-blue-50');
  });
});
