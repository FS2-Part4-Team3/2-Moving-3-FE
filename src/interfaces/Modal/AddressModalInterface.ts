import type { Dispatch, SetStateAction } from "react";

export interface AddressModalProps {
  handleModalClose: () => void;
  isStartModalOpen?: boolean;
  isArrivalModalOpen?: boolean;
  setRegions: Dispatch<SetStateAction<{ start: string; arrival: string }>>;
}
