import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '@/components/common/pagination/pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  const setup = (currentPage: number, totalPages: number) => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('현재 페이지와 총 페이지 수를 올바르게 렌더링', () => {
    setup(3, 5);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('이전 버튼이 비활성화 상태일 때 클릭해도 `onPageChange`가 호출되지 않음', () => {
    setup(1, 5);

    const leftArrow = screen.getAllByAltText('left_arrow')[0];
    fireEvent.click(leftArrow);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('다음 버튼이 비활성화 상태일 때 클릭해도 `onPageChange`가 호출되지 않음', () => {
    setup(5, 5);

    const rightArrow = screen.getAllByAltText('right_arrow')[0];
    fireEvent.click(rightArrow);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('이전 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
    setup(3, 5);

    const leftArrow = screen.getAllByAltText('left_arrow')[0];
    fireEvent.click(leftArrow);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('다음 버튼 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
    setup(3, 5);

    const rightArrow = screen.getAllByAltText('right_arrow')[0];
    fireEvent.click(rightArrow);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('페이지 번호 클릭 시 `onPageChange`가 올바르게 호출됨', () => {
    setup(3, 5);

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
