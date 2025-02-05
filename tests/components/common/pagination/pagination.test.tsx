import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '@/components/common/pagination/pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  const setup = (currentPage: number, totalPages: number, windowWidth: number) => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: windowWidth });
    window.dispatchEvent(new Event('resize'));
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('maxVisiblePages = 5 (1200px 이상)', () => {
    beforeEach(() => {
      setup(3, 10, 1300);
    });

    it('페이지네이션을 올바르게 렌더링 - 기준 숫자 양옆 2개, 페이지 개수가 많아지면 `···` 렌더링', () => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('···')).toBeInTheDocument();
      expect(screen.queryByText('7')).not.toBeInTheDocument();
    });

    it('다음 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const rightArrow = screen.getAllByAltText('right_arrow')[0];
      fireEvent.click(rightArrow);
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('이전 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const leftArrow = screen.getAllByAltText('left_arrow')[0];
      fireEvent.click(leftArrow);
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('페이지 번호 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const pageButton = screen.getByText('2');
      fireEvent.click(pageButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('이전 버튼이 비활성화 상태일 때 클릭해도 `onPageChange`가 호출되지 않음', () => {
      setup(1, 10, 1300);
      const leftArrow = screen.getAllByAltText('left_arrow')[0];
      fireEvent.click(leftArrow);
      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe('maxVisiblePages = 3 (1200px 미만)', () => {
    beforeEach(() => {
      setup(5, 10, 800);
    });

    it('페이지네이션을 올바르게 렌더링 - 기준 숫자 양옆 한 개, 페이지 개수가 많아지면 `···` 렌더링', () => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.queryByText('7')).not.toBeInTheDocument();

      const ellipses = screen.getAllByText('···');
      expect(ellipses.length).toBe(2);
    });

    it('다음 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const rightArrow = screen.getAllByAltText('right_arrow')[0];
      fireEvent.click(rightArrow);
      expect(mockOnPageChange).toHaveBeenCalledWith(6);
    });

    it('이전 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const leftArrow = screen.getAllByAltText('left_arrow')[0];
      fireEvent.click(leftArrow);
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('페이지 번호 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
      const pageButton = screen.getByText('4');
      fireEvent.click(pageButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('이전 버튼이 비활성화 상태일 때 클릭해도 `onPageChange`가 호출되지 않음', () => {
      setup(1, 10, 800);
      const leftArrow = screen.getAllByAltText('left_arrow')[0];
      fireEvent.click(leftArrow);
      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  it('전체 페이지가 1개일 때 버튼이 비활성화됨', () => {
    setup(1, 1, 1300);

    const leftArrow = screen.getAllByAltText('left_arrow')[0];
    const rightArrow = screen.getAllByAltText('right_arrow')[0];

    fireEvent.click(leftArrow);
    fireEvent.click(rightArrow);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
