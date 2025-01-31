import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
  id?: string;
  name?: string;
  nickname?: string;
  accessToken?: string;
  email?: string;
  image?: string;
  phoneNumber?: string;
  introduce?: string;
  description?: string;
  serviceType?: string[];
  availableAreas?: string[]; // 기사님의 경우 서비스 가능 지역
  areas?: string[]; // 일반 유저의 경우 내가 사는 지역
  type?: string;
  startAt?: string;
}

const initialState: SignInState = {
  id: '',
  name: '',
  nickname: '',
  accessToken: '',
  email: '',
  image: '',
  phoneNumber: '',
  introduce: '',
  description: '',
  serviceType: [],
  availableAreas: [],
  areas: [],
  type: '',
  startAt: '',
};

const signInSlice = createSlice({
  name: 'SignIn',
  initialState,
  reducers: {
    setUserSign(state, action: PayloadAction<SignInState>) {
      const { id, name, accessToken, email, image, phoneNumber, serviceType, type } = action.payload;

      state.id = id;
      state.name = name;
      state.accessToken = accessToken;
      state.email = email;
      state.image = image;
      state.phoneNumber = phoneNumber;
      state.serviceType = serviceType;
      state.type = type;

      if (type === 'driver') {
        state.nickname = action.payload.nickname;
        state.availableAreas = action.payload.availableAreas;
        state.areas = [];
        state.description = action.payload.description;
        state.introduce = action.payload.introduce;
        state.startAt = action.payload.startAt;
      } else if (type === 'user') {
        state.areas = action.payload.areas;
        state.availableAreas = [];
        state.nickname = '';
        state.startAt = '';
        state.introduce = '';
        state.description = '';
      }
    },
    setProfile(state, action: PayloadAction<SignInState>) {
      const { image, serviceType, areas, nickname, startAt, introduce, description, availableAreas } = action.payload;

      state.image = image;
      state.serviceType = serviceType;
      state.areas = areas;
      state.nickname = nickname;
      state.introduce = introduce;
      state.description = description;
      state.startAt = startAt;
      state.availableAreas = availableAreas;
    },
    setProfileNoImg(state, action: PayloadAction<SignInState>) {
      const { serviceType, areas, nickname, startAt, introduce, description, availableAreas } = action.payload;
      state.serviceType = serviceType;
      state.areas = areas;
      state.nickname = nickname;
      state.introduce = introduce;
      state.description = description;
      state.startAt = startAt;
      state.availableAreas = availableAreas;
    },
    setInfo(state, action: PayloadAction<SignInState>) {
      const { name, phoneNumber } = action.payload;
      state.name = name;
      state.phoneNumber = phoneNumber;
    },
    setSignOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserSign, setProfile, setProfileNoImg, setInfo, setSignOut } = signInSlice.actions;
export default signInSlice.reducer;
