import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EstimationState {
  confirmedEstimationId: string | undefined;
}

const initialState: EstimationState = {
  confirmedEstimationId: undefined,
};

const estimationSlice = createSlice({
  name: 'estimation',
  initialState,
  reducers: {
    setConfirmedEstimation(state, action: PayloadAction<string | undefined>) {
      state.confirmedEstimationId = action.payload;
    },
    setDeleteEstimationKeys(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setConfirmedEstimation, setDeleteEstimationKeys } = estimationSlice.actions;
export default estimationSlice.reducer;
