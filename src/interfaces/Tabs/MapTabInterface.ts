export interface MapTabProps {
  activeTab: 'tab1' | 'tab2' | 'tab3';
  setActiveTab: (tab: 'tab1' | 'tab2' | 'tab3') => void;
  renderContent: () => JSX.Element | null;
}
