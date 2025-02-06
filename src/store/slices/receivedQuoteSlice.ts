import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface receivedQuote {
  id: string;
  createdAt: string;
  serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
  date: string;
  fromAddress: string;
  toAddress: string;
  progress?: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
}

interface receiveQuoteState {
  quotes: receivedQuote[];
  filter?: 'all' | 'confirmed';
}

const initialState: receiveQuoteState = {
  quotes: [],
  filter: 'all',
};

const receivedQuoteSlice = createSlice({
  name: 'ReceivedQuote',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<receivedQuote>) {
      const newQuote = action.payload;
      console.log('newQuote in Reducer', newQuote);
      console.log('STATE', state);
      console.log('quotes in Reducer', state.quotes);
      const index = state.quotes.findIndex(quote => quote.id === newQuote.id);

      if (index >= 0) {
        state.quotes[index] = newQuote;
      } else {
        state.quotes.push(newQuote);
      }
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
