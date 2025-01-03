export interface Region {
  name: string;
}

export interface MovingType {
  type: string;
}

export interface ProfileChipProps {
  regions: Region[];
  movingTypes: MovingType[];
}
