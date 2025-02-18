import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatType {
  id: string;
}

const initialState: ChatType = {
  id: '',
};

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatType>) {
      const { id } = action.payload;

      state.id = id;
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
