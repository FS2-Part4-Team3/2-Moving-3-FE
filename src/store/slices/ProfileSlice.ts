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
  socialEdit?: boolean;
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
  socialEdit: false,
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
    setSocialEdit(state, action: PayloadAction<ProfileType>) {
      const { socialEdit } = action.payload;
      state.socialEdit = socialEdit;
    },
    setProfileSignOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setProfile, setProfileNoImg, setProfileSignOut, setSocialEdit } = profileSlice.actions;
export default profileSlice.reducer;
