import { configureStore } from '@reduxjs/toolkit';

const mockRegions = [
  { code: 'R1', name: '서울' },
  { code: 'R2', name: '경기' },
];

const mockMovingTypes = [
  { code: 'M1', type: '소형' },
  { code: 'M2', type: '가정' },
];

const mockStore = configureStore({
  reducer: {
    signIn: () => ({ type: 'driver' }),
  },
});
