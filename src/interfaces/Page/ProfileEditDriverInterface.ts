export interface ProfileEditDriverProps {
  values: {
    nickname: string;
    career: number | string;
    shortBio: string;
    description: string;
    selectedRegion: string | null;
    selectedMovingType: string | null;
  };
  imgUrl: string;
}
