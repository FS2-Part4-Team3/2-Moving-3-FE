import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MyQuotation {
  id?: string;
}

const initialState: MyQuotation = {
  id: '',
};

const myQuotationSlice = createSlice({
  name: 'myQuotation',
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setId } = myQuotationSlice.actions;
export default myQuotationSlice.reducer;
