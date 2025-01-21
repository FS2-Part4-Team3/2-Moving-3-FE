import type { MovingTypeCheckType } from '@/interfaces/Card/MovingTypeCheckCardInterface';

const movingTypesCheck: MovingTypeCheckType[] = [
  { type: '소형이사 (원룸, 투룸, 20평대 미만)', code: 'SMALL' },
  { type: '가정이사 (쓰리룸, 20평대 이상)', code: 'HOME' },
  { type: '사무실이사 (사무실, 상업공간)', code: 'OFFICE' },
];

export default movingTypesCheck;
