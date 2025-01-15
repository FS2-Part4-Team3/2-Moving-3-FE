import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  accessToken: string | undefined;
  email: string | undefined;
  image: string | undefined;
  phoneNumber: string | undefined;
  introduce: string | null | undefined;
  description: string | null | undefined;
  serviceTypes: string[] | undefined;
  availableAreas: string[] | undefined; // 기사님의 경우 서비스 가능 지역
  areas: string[] | undefined; // 일반 유저의 경우 내가 사는 지역
  type: string | undefined;
}

const initialState: SignInState = {
  id: undefined,
  name: undefined,
  nickname: undefined,
  accessToken: undefined,
  email: undefined,
  image: undefined,
  phoneNumber: undefined,
  introduce: undefined,
  description: undefined,
  serviceTypes: undefined,
  availableAreas: undefined,
  areas: undefined,
  type: undefined,
};

const signInSlice = createSlice({
  name: 'SignIn',
  initialState,
  reducers: {
    setUserSign(state, action: PayloadAction<SignInState>) {
      const { id, name, accessToken, email, image, phoneNumber, serviceTypes, type } = action.payload;

      state.id = id;
      state.name = name;
      state.accessToken = accessToken;
      state.email = email;
      state.image = image;
      state.phoneNumber = phoneNumber;
      state.serviceTypes = serviceTypes;
      state.type = type;

      if (type === 'driver') {
        state.nickname = action.payload.nickname;
        state.availableAreas = action.payload.availableAreas;
        state.areas = undefined;
      } else if (type === 'user') {
        state.areas = action.payload.areas;
        state.availableAreas = undefined;
        state.nickname = undefined;
      }
    },
    setSignOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserSign, setSignOut } = signInSlice.actions;
export default signInSlice.reducer;
