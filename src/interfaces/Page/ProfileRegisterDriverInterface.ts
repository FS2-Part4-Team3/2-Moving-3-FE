export interface RegisterDriverValues {
  nickname: string;
  career: number | string;
  shortBio: string;
  description: string;
  selectedRegion: string | null;
  selectedMovingType: string | null;
  name: string;
  email: string;
  number: string;
  nowPassword: string;
  newPassword: string;
  newPasswordChk: string;
}

export interface Errors {
  nickname?: string;
  career?: string;
  shortBio?: string;
  description?: string;
  selectedRegion?: string;
  selectedMovingType?: string;
  name?: string;
  email?: string;
  number?: string;
  nowPassword?: string;
  newPassword?: string;
  newPasswordChk?: string;
}

export interface ValidateProps {
  type: 'REGISTER' | 'EDIT';
}
