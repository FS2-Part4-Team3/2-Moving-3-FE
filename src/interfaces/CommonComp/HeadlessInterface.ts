export interface InputContextType {
  id?: string;
  value: string | number;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface ButtonContextType {
  id: string;
  onClick?: () => void;
  type?: string;
}

export interface ModalContextType {
  onClose: () => void;
}
