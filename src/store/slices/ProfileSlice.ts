import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProfileType {
  nickname?: string;
  image?: string;
  phoneNumber?: string;
  introduce?: string;
  description?: string;
  serviceType?: string[];
  availableAreas?: string[];
  areas?: string[];
  type?: string;
  startAt?: string;
  isPasswordCheck?: boolean;
}

const initialState: ProfileType = {
  nickname: '',
  image: '',
  phoneNumber: '',
  introduce: '',
  description: '',
  serviceType: [],
  availableAreas: [],
  areas: [],
  type: '',
  startAt: '',
  isPasswordCheck: false,
};

const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileType>) {
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
    setProfileNoImg(state, action: PayloadAction<ProfileType>) {
      const { serviceType, areas, nickname, startAt, introduce, description, availableAreas } = action.payload;
      state.serviceType = serviceType;
      state.areas = areas;
      state.nickname = nickname;
      state.introduce = introduce;
      state.description = description;
      state.startAt = startAt;
      state.availableAreas = availableAreas;
    },

    setIsPasswordCheck(state, action: PayloadAction<ProfileType>) {
      const { isPasswordCheck } = action.payload;
      state.isPasswordCheck = isPasswordCheck;
    },
    setProfileSignOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setProfile, setProfileNoImg, setProfileSignOut, setIsPasswordCheck } = profileSlice.actions;
export default profileSlice.reducer;
