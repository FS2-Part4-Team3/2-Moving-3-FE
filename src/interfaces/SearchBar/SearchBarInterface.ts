export interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  handleSearch?: () => void;
}
