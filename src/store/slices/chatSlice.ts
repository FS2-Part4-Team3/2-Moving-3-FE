import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatType {
  id?: string;
  moveId?: string;
  serviceType?: string;
  date?: string;
  fromAddress?: string;
  toAddress?: string;
  ownerId?: string;
}

const initialState: ChatType = {
  id: '',
  moveId: '',
  serviceType: '',
  date: '',
  fromAddress: '',
  toAddress: '',
  ownerId: '',
};

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatType>) {
      const { id } = action.payload;

      state.id = id;
    },
    setMoves(state, action: PayloadAction<ChatType>) {
      const { moveId, serviceType, date, fromAddress, toAddress, ownerId } = action.payload;

      state.moveId = moveId;
      state.serviceType = serviceType;
      state.date = date;
      state.fromAddress = fromAddress;
      state.toAddress = toAddress;
      state.ownerId = ownerId;
    },
    setChatSignOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setChat, setMoves, setChatSignOut } = chatSlice.actions;
export default chatSlice.reducer;
