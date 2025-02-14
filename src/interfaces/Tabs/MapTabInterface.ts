export interface MapTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderContent: () => JSX.Element | null;
}
