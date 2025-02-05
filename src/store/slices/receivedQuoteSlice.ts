import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface receivedQuoteState {
  id: string;
  createdAt: string;
  serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
  date: string;
  fromAddress: string;
  toAddress: string;
  progress?: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
  filter?: 'all' | 'confirmed';
}

const initialState: receivedQuoteState = {
  id: '',
  createdAt: '',
  serviceType: undefined,
  date: '',
  fromAddress: '',
  toAddress: '',
  progress: undefined,
  filter: 'all',
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

    setFilterDropdown(state, action: PayloadAction<'all' | 'confirmed'>) {
      state.filter = action.payload;
    },

    setReceivedQuoteInitialization(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setData, setFilterDropdown, setReceivedQuoteInitialization } = receivedQuoteSlice.actions;
export default receivedQuoteSlice.reducer;
