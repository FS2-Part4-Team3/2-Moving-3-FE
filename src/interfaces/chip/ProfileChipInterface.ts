import type { Dispatch, SetStateAction } from 'react';

export interface Region {
  name: string;
  code: string;
}

export interface MovingType {
  type: string;
  code: string;
}

export interface ProfileChipProps {
  regions?: Region[];
  movingTypes?: MovingType[];
  selectedMovingType?: string[];
  selectedRegions?: string[];
  setSelectedMovingType?: (args: string[]) => void;
  setSelectedRegions?: (args: string[]) => void;
}
