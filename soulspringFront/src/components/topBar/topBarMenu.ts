import { PATHS } from '@config/constants/paths';

export interface Item {
  id: number;
  label: string;
  path: string;
}

export const ItemsMain: Item[] = [
  { id: 1, label: 'topbar.home', path: PATHS.ROOT },
  { id: 2, label: 'topbar.about_us', path: PATHS.ABOUT_US },
  { id: 3, label: 'topbar.forum', path: PATHS.POST.ROOT },
  { id: 4, label: 'topbar.professional', path: PATHS.professional.ROOT },

];
