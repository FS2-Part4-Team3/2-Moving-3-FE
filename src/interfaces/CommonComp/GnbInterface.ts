export interface ProfileProps {
  closeModal: () => void;
}

export interface NotificationProps {
  notifications: string[];
  onClose: () => void;
}
