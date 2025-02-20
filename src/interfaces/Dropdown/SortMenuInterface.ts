export interface SortMenuProps {
  name: string;
  code?: string;
}

export interface EstimationSortDropdownProps {
  onChange: (newFilter: 'all' | 'confirmed') => void;
}
