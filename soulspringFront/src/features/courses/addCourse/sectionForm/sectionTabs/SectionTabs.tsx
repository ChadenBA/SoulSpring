import { SectionTabsRoot } from './SectionTabs.style';
import { SectionTabsProps } from './SectionTabs.type';
import { Stack, Tab } from '@mui/material';

function SectionTabs({ eu, activeEu, handleChange, setSelectedEu }: SectionTabsProps) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <SectionTabsRoot
        value={activeEu}
        onChange={handleChange}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {eu.map((e) => (
          <Tab key={e.id} label={e.title} onClick={() => setSelectedEu(e.id)} />
        ))}
      </SectionTabsRoot>
    </Stack>
  );
}

export default SectionTabs;
