import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InfoType {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

const initialState: InfoType = {
  name: '',
  email: '',
  phoneNumber: '',
};

const InfoSlice = createSlice({
  name: 'Info',
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<InfoType>) {
      const { name, phoneNumber } = action.payload;
      state.name = name;
      state.phoneNumber = phoneNumber;
    },
  },
});

export const { setInfo } = InfoSlice.actions;
export default InfoSlice.reducer;
