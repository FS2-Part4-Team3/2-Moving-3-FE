export type Direction = 'USER_TO_DRIVER' | 'DRIVER_TO_USER';

export interface ChatMessage {
  userId: string;
  driverId: string;
  direction: Direction;
  message: string;
  image?: string;
  isRead?: boolean;
}
