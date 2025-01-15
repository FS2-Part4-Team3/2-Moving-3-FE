import type { Region } from '@/interfaces/chip/ProfileChipInterface';

const regions: Region[] = [
  { name: '전체', code: null },
  { name: '서울', code: 'SEOUL' },
  { name: '경기', code: 'GYEONGGI' },
  { name: '인천', code: 'INCHEON' },
  { name: '강원', code: 'GANGWON' },
  { name: '충북', code: 'CHUNGBUK' },
  { name: '충남', code: 'CHUNGNAM' },
  { name: '세종', code: 'SEJONG' },
  { name: '대전', code: 'DAEJEON' },
  { name: '전북', code: 'JEONBUK' },
  { name: '전남', code: 'JEONNAM' },
  { name: '광주', code: 'GWANGJU' },
  { name: '경북', code: 'GYEONGBUK' },
  { name: '경남', code: 'GYEONGNAM' },
  { name: '대구', code: 'DAEGU' },
  { name: '울산', code: 'ULSAN' },
  { name: '부산', code: 'BUSAN' },
  { name: '제주', code: 'JEJU' },
];

export default regions;
