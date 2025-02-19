import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ReviewAnalysisState {
  filter: 'ALL' | 'POSITIVE' | 'NEGATIVE';
}

const initialState: ReviewAnalysisState = {
  filter: 'ALL',
};

const reviewSlice = createSlice({
  name: 'reviewAnalysis',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<'ALL' | 'POSITIVE' | 'NEGATIVE'>) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = reviewSlice.actions;
export default reviewSlice.reducer;
