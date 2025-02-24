import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EstimationState {
  confirmedEstimationId: string | null;
}

const initialState: EstimationState = {
  confirmedEstimationId: null,
};

const estimationSlice = createSlice({
  name: 'estimation',
  initialState,
  reducers: {
    setConfirmedEstimation(state, action: PayloadAction<string | null>) {
      state.confirmedEstimationId = action.payload;
    },
    setDeleteEstimationKeys(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setConfirmedEstimation, setDeleteEstimationKeys } = estimationSlice.actions;
export default estimationSlice.reducer;
