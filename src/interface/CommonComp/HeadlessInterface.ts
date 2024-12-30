export interface InputContextType {
  id?: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonContextType {
  id: string;
  label: string;
  onClick: () => void;
}
