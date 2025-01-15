import type { SortMenuProps } from '@/interfaces/Dropdown/SortMenuInterface';

const SortMenu: SortMenuProps[] = [
  { name: '리뷰 많은 순', code: 'MostReviewed' },
  { name: '평점 높은 순', code: 'HighestRating' },
  { name: '경력 높은 순', code: 'HighestCareer' },
  { name: '확정 많은 순', code: 'MostApplied' },
];

export default SortMenu;
