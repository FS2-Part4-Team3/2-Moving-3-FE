export interface KakaoMapProps {
  activeTab: 'tab1' | 'tab2' | 'tab3';
  fromAddress?: string;
  toAddress?: string;
  curLocation?: {
    latitude: number;
    longitude: number;
  };
  setFromCoordinate: React.Dispatch<React.SetStateAction<{ La: number; Ma: number } | null>>;
  setToCoordinate: React.Dispatch<React.SetStateAction<{ La: number; Ma: number } | null>>;
}
