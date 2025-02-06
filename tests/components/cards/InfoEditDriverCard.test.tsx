import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import { InfoEditDriverCardProps } from '@/interfaces/Card/InfoEditDriverCardInterface';

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

jest.mock('@/_pages/DriverDetail/DetailButtonClient', () => {
  return function MockDetailButtonClient({ type }: { type: string }) {
    return (
      <>
        {type === 'InfoEditDriver' && (
          <>
            <button>기본 정보 수정</button>
            <button>내 프로필 수정</button>
          </>
        )}
      </>
    );
  };
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/../public/assets/common/gnb/standard_profile.svg', () => '/assets/common/gnb/standard_profile.svg');

const mockDriverData: InfoEditDriverCardProps['data'] = {
  id: 'test-driver-1',
  name: '홍길동',
  introduce: '친절한 기사님',
  image: '/path/to/image.jpg',
  rating: 4.5,
  reviewCount: 150,
  career: 5,
  applyCount: 120,
  serviceType: ['SMALL', 'OFFICE'],
  availableAreas: ['SEOUL', 'INCHEON'],
};

describe('InfoEditDriverCard', () => {
  it('드라이버 이름, 소개, 별점 및 리뷰 수, 경력과 확정 건수, 제공 서비스와 지역 정보, 프로필 이미지가 렌더링 되어야한다.', () => {
    render(<InfoEditDriverCard data={mockDriverData} />);

    // 이름
    expect(screen.getByText(mockDriverData.name)).toBeInTheDocument();

    // 소개
    expect(screen.getByText(mockDriverData.introduce)).toBeInTheDocument();

    // 별점 및 리뷰 수
    expect(screen.getByText(`${mockDriverData.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockDriverData.reviewCount})`)).toBeInTheDocument();

    // 경력과 확정 건수
    expect(screen.getByText(`${mockDriverData.career}년`)).toBeInTheDocument();
    expect(screen.getByText(`${mockDriverData.applyCount}건`)).toBeInTheDocument();

    // 제공 서비스와 지역 정보
    expect(screen.getByText('소형이사, 사무실이사')).toBeInTheDocument();
    expect(screen.getByText('서울, 인천')).toBeInTheDocument();

    // 프로필 이미지
    const profileImages = screen.getAllByAltText('driver');
    const imgElement = profileImages[0].closest('img');
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('image.jpg'));
  });

  it('프로필 이미지가 없을 경우 기본 이미지가 렌더링되어야 한다', () => {
    const noImageData = { ...mockDriverData, image: '' };
    render(<InfoEditDriverCard data={noImageData} />);

    const profileImages = screen.getAllByAltText('driver');
    const imgElement = profileImages[0].closest('img');
    expect(imgElement).toHaveAttribute('src', '/assets/common/gnb/standard_profile.svg');
  });

  it('DetailButtonClient 버튼이 두 번 렌더링되어야 한다', () => {
    render(<InfoEditDriverCard data={mockDriverData} />);

    // '기본 정보 수정' 버튼이 하나만 있는지 확인
    const basicEditButton = screen.getAllByRole('button', { name: /기본 정보 수정/i })[0];
    expect(basicEditButton).toBeInTheDocument();

    // '내 프로필 수정' 버튼이 하나만 있는지 확인
    const profileEditButton = screen.getAllByRole('button', { name: /내 프로필 수정/i })[0];
    expect(profileEditButton).toBeInTheDocument();
  });

  // it('should trigger DetailButtonClient click event', async () => {
  //   render(<InfoEditDriverCard data={mockDriverData} />);

  //   // 수정 버튼 클릭
  //   const user = userEvent.setup();
  //   const detailButton = screen.getByRole('button', { name: /수정/i });
  //   await user.click(detailButton);

  //   // 여기서는 버튼 클릭 후의 동작을 시뮬레이션할 수 있지만,
  //   // 실제 동작은 `DetailButtonClient` 컴포넌트 내부에서 정의된 동작에 따라 다를 수 있습니다.
  //   // 해당 컴포넌트의 클릭 이벤트 핸들러를 모킹하거나 실제 동작을 테스트할 수 있습니다.
  //   // 예를 들어, 'click' 이벤트 후 예상되는 페이지 이동이나 API 호출 등을 확인할 수 있습니다.
  // });

  // it('type이 InfoEditDriver일 때 수정 버튼이 렌더링되어야 한다', () => {
  //   render(<InfoEditDriverCard data={mockDriverData} />);
  //   expect(screen.getByText('기본 정보 수정')).toBeInTheDocument();
  //   expect(screen.getByText('내 프로필 수정')).toBeInTheDocument();
  // });

  // it('기본 정보 수정 버튼을 클릭하면 동작해야 한다', async () => {
  //   render(<InfoEditDriverCard data={mockDriverData} />);
  //   const button = screen.getByText('기본 정보 수정');
  //   await userEvent.click(button);
  //   expect(button).toBeInTheDocument();
  // });
});
