import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface receivedQuoteState {
  id: string;
  createdAt: string;
  serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
  date: string;
  fromAddress: string;
  toAddress: string;
  progress?: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
}

const initialState: receivedQuoteState = {
  id: '',
  createdAt: '',
  serviceType: undefined,
  date: '',
  fromAddress: '',
  toAddress: '',
  progress: undefined,
};

const receivedQuoteSlice = createSlice({
  name: 'ReceivedQuote',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<receivedQuoteState>) {
      const { id, createdAt, serviceType, date, fromAddress, toAddress, progress } = action.payload;

      state.id = id;
      state.createdAt = createdAt;
      state.serviceType = serviceType;
      state.date = date;
      state.fromAddress = fromAddress;
      state.toAddress = toAddress;
      state.progress = progress;
    },
  },
});

export const { setData } = receivedQuoteSlice.actions;
export default receivedQuoteSlice.reducer;
