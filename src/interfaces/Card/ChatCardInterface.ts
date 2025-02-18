export interface InfoData {
  image: string;
  name: string;
  type: string;
}

export interface ChatData {
  totalCount: number;
  list: Chat[];
}

export interface Chat {
  userId: string;
  driverId: string;
  direction: string;
  message: string;
  image: string;
  isRead: boolean;
  id: string;
}

export interface Online {
  id: string;
  isOnline: boolean;
}

export interface ChatRead {
  ids: string[];
}
