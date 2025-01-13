export interface Region {
  name: string;
}

export interface MovingType {
  type: string;
}

export interface ProfileChipProps {
  regions?: Region[];
  movingTypes?: MovingType[];
  selectedRegion?: string | null;
  selectedMovingType?: string | null;
  selectedRegions?: string[] | null;
  setSelectedRegion?: (arg: string) => void;
  setSelectedMovingType?: (arg: string) => void;
  setSelectedRegions?: (arg: string[]) => void;
}
