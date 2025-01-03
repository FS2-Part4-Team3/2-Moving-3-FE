export interface InputContextType {
  id?: string;
  value?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonContextType {
  id: string;
  onClick: () => void;
}

export interface ModalContextType {
  onClose: () => void;
}
