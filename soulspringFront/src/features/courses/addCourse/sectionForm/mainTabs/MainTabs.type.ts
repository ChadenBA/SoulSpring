import { SyntheticEvent } from 'react';

export interface MainTabsProps {
  activeTab: number;
  handleChange: (_: SyntheticEvent, newValue: number) => void;
}
