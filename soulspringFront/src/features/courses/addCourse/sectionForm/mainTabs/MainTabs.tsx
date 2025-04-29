import { MAIN_TABS_TYPE } from './MainTabs.constants';
import { SectionTabsRoot } from './MainTabs.style';
import { MainTabsProps } from './MainTabs.type';
import { Stack, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

function MainTabs({ activeTab, handleChange }: MainTabsProps) {
  const { t } = useTranslation();

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <SectionTabsRoot
        value={activeTab}
        onChange={handleChange}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {MAIN_TABS_TYPE.map((e) => (
          <Tab key={e.type} label={t(e.label)} />
        ))}
      </SectionTabsRoot>
    </Stack>
  );
}

export default MainTabs;
