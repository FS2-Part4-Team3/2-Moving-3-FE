export interface Region {
  name: string;
  code?: string | null;
}

export interface MovingType {
  type: string;
  code?: string | null;
}

export interface ProfileChipProps {
  regions?: Region[];
  movingTypes?: MovingType[];
  selectedMovingType?: string | null;
  selectedRegions?: string[] | null;
  setSelectedMovingType?: (arg: string) => void;
  setSelectedRegions?: (arg: string[]) => void;
}
