export interface ProfileProps {
  closeModal: () => void;
}

export interface NotificationProps {
  notifications: NotificationData[];
  onClose: () => void;
}

export interface NotificationResponse {
  list: NotificationData[];
  totalCount: number;
}

export interface NotificationData {
  createdAt: string;
  updatedAt: string;
  driverId: string | null;
  estimationId: string | null;
  id: string;
  isRead: boolean;
  moveInfoId: string | null;
  questionId: string | null;
  requestId: string | null;
  type:
    | 'MOVE_INFO_EXPIRED' // 일반요청을 하면 기간만료된거 유저한테 알림가는거
    | 'NEW_REQUEST' // 새로운 지정 요청이 기사한테 갔을때 기사한테 알림이 가는거
    | 'NEW_ESTIMATION' // 유저한테 니가 일반요청을 올린거에 새로운 견적이 왔어
    | 'REQUEST_REJECTED' // 유저가 지정견적 요청 하면 기사가 거절헀다고 유저한테 알림
    | 'ESTIMATION_CONFIRMED' // 기사가 견적을 보내면 그 견적이 확정됐다는 알림을 기사한테
    | 'NEW_QUESTION' // 둘 다 가능한데, 문의내역
    | 'D_7' // 이사일 7일 전일 때
    | 'D_1' // 이사일 전날
    | 'D_DAY'; // 이사 당일날일 때
}
