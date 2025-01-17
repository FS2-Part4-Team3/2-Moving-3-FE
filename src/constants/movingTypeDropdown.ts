import { MovingType } from '@/interfaces/Constants/MovingTypeDropdownInterface';

const movingTypes: MovingType[] = [
  { type: '전체', code: null },
  { type: '소형이사', code: 'SMALL' },
  { type: '가정이사', code: 'HOME' },
  { type: '사무실이사', code: 'OFFICE' },
];

export default movingTypes;
