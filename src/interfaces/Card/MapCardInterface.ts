export interface MapTextCardProps {
  handleClick: (coordinate: { La: number; Ma: number } | null, address: string) => void;
  fromCoordinate: {
    La: number;
    Ma: number;
  } | null;
  toCoordinate: {
    La: number;
    Ma: number;
  } | null;
}
