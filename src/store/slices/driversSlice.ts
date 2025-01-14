import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DriverState {
  selectedRegion: string | null;
  selectedService: string | null;
}

const initialState: DriverState = {
  selectedRegion: null,
  selectedService: null,
};

const driverSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setSelectedRegion(state, action: PayloadAction<string | null>) {
      state.selectedRegion = action.payload;
    },
    setSelectedService(state, action: PayloadAction<string | null>) {
      state.selectedService = action.payload;
    },
    resetSelection(state) {
      state.selectedRegion = null;
      state.selectedService = null;
    },
  },
});

export const { setSelectedRegion, setSelectedService, resetSelection } = driverSlice.actions;
export default driverSlice.reducer;
