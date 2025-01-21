import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import { DateIncludeTimeFormat, DateWithoutDayWeeKFormat } from '@/utils/Format';

jest.mock('@/utils/Format', () => ({
  DateIncludeTimeFormat: jest.fn(),
  DateWithoutDayWeeKFormat: jest.fn(),
}));

describe('Estimation information card', () => {
  const mockData = {
    updatedAt: '2024-01-20T10:00:00Z',
    moveInfo: {
      type: 'SMALL' as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT',
      date: '2024-02-01T14:00:00Z',
      fromAddress: '서울시 강남구',
      toAddress: '서울시 서초구',
    },
  };

  beforeEach(() => {
    (DateIncludeTimeFormat as jest.Mock).mockImplementation(date => date);
    (DateWithoutDayWeeKFormat as jest.Mock).mockImplementation(date => date);
  });

  it('render the component with correct title', () => {
    render(<EstimationInformationCard data={mockData} />);
    expect(screen.getByText('견적 정보')).toBeInTheDocument();
  });

  it('render all label texts correctly', () => {
    render(<EstimationInformationCard data={mockData} />);

    const labels = ['견적 요청일', '서비스', '이용일', '출발지', '도착지'];
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('render correct move type for small type', () => {
    render(<EstimationInformationCard data={mockData} />);
    expect(screen.getByText('소형이사')).toBeInTheDocument();
  });

  it('render address correctly', () => {
    render(<EstimationInformationCard data={mockData} />);
    expect(screen.getByText('서울시 강남구')).toBeInTheDocument();
    expect(screen.getByText('서울시 서초구')).toBeInTheDocument();
  });

  it('render date formatting function with correct parameters', () => {
    render(<EstimationInformationCard data={mockData} />);

    expect(DateWithoutDayWeeKFormat).toHaveBeenCalledWith(mockData.updatedAt);
    expect(DateIncludeTimeFormat).toHaveBeenCalledWith(mockData.moveInfo.date);
  });

  it('render correctly with different move types', () => {
    const moveType: Array<{
      type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT';
      expected: string;
    }> = [
      { type: 'HOME', expected: '가정이사' },
      { type: 'OFFICE', expected: '사무실이사' },
      { type: 'APPOINTMENT', expected: '지정 견적 요청' },
    ];

    moveType.forEach(({ type, expected }) => {
      const testData = {
        ...mockData,
        moveInfo: { ...mockData.moveInfo, type },
      };

      const { rerender } = render(<EstimationInformationCard data={testData} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      rerender(<></>);
    });
  });
});
