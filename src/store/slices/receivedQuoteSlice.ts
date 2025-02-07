import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface receiveQuoteState {
  filter?: 'all' | 'confirmed';
}

const initialState: receiveQuoteState = {
  filter: 'all',
};

const receivedQuoteSlice = createSlice({
  name: 'ReceivedQuote',
  initialState,
  reducers: {
    setFilterDropdown(state, action: PayloadAction<'all' | 'confirmed'>) {
      state.filter = action.payload;
    },

    setReceivedQuoteInitialization(state) {
      return initialState;
    },
  },
});

export const { setFilterDropdown, setReceivedQuoteInitialization } = receivedQuoteSlice.actions;
export default receivedQuoteSlice.reducer;
