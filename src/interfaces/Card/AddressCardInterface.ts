import type { Dispatch, SetStateAction } from 'react';

export interface AddressCardProps {
  regions: {
    start: string;
    arrival: string;
  };
  setRegions: Dispatch<
    SetStateAction<{
      start: string;
      arrival: string;
    }>
  >;
  handleSubmit: () => void;
}
