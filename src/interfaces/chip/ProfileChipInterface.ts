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
  selectedRegion?: string | null;
  selectedMovingType?: string | null;
  selectedRegions?: string[] | null;
  setSelectedRegion?: (arg: string) => void;
  setSelectedMovingType?: (arg: string) => void;
  setSelectedRegions?: (arg: string[]) => void;
}
