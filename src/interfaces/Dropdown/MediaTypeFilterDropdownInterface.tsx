export interface MediaTypeFilterDropdownProps {
  isOpen: boolean;
  onClick: () => void;
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
}

interface FilterState {
  smallMov: boolean;
  homeMov: boolean;
  officeMov: boolean;
  serviceable: boolean;
  appointRequest: boolean;
  types: string[];
}
