export interface RegisterDriverValues {
  nickname: string;
  career: number | string;
  shortBio: string;
  description: string;
  selectedRegion: string | null;
  selectedMovingType: string | null;
}

export interface Errors {
  nickname?: string;
  career?: string;
  shortBio?: string;
  description?: string;
  selectedRegion?: string;
  selectedMovingType?: string;
}
