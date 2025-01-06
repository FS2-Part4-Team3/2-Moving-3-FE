export interface RegisterDriverValues {
  nickname: string;
  carrer: number | string;
  shortBio: string;
  description: string;
  selectedRegion: string | null;
  selectedMovingType: string | null;
}

export interface Errors {
  nickname?: string;
  carrer?: string;
  shortBio?: string;
  description?: string;
  selectedRegion?: string;
  selectedMovingType?: string;
}
