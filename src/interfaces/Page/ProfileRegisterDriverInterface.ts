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
  password: string;
  passwordChk: string;
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
  password?: string;
  passwordChk?: string;
}
