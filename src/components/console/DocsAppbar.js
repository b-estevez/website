import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { useZestyStore } from 'store';
import { AlgoSearch } from 'views/Docs/AlgoSearch';
import { DocsComboBox } from 'views/Docs/DocsComboBox';
import { DocsTabs } from 'views/Docs/DocsTabs';
import { SearchModal } from 'views/Docs/SearchModal';

const tabs = [
  { label: 'Guides', value: 'guides' },
  { label: 'Support', value: 'support' },
  { label: 'Reference', value: 'reference' },
  { label: 'Resources', value: 'resources' },
];

export const DocsAppbar = React.memo(() => {
  const [currentTab, setcurrentTab] = React.useState('guides');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mainData } = useZestyStore((state) => state);

  const onChangeDropdown = (data) => {
    window.scrollTo(0, 0);
    if (data?.value) {
      router.push(`/docs` + data.value.parent);
    } else {
      router.push(`/docs` + '/instances');
    }
  };

  const DOCS_DATA_DROPDOWN = (data) => {
    const res = data.map((e) => {
      return { label: e.info.name, value: e };
    });
    return res;
  };
  return (
    <Stack
      direction={'row'}
      alignItems="center"
      justifyContent={'space-between'}
      sx={{
        px: 2,
        py: 1,
        alignItems: isMobile ? 'left' : 'center',
        borderTop: `1px solid ${grey[200]}`,
        bgcolor: '#fff',
      }}
    >
      <Stack pt={1} direction="row" spacing={2}>
        <DocsComboBox
          width={'20rem'}
          onChange={onChangeDropdown}
          options={DOCS_DATA_DROPDOWN(mainData)}
        />
        <DocsTabs setvalue={setcurrentTab} value={currentTab} tabs={tabs} />
      </Stack>

      <Stack>
        <SearchModal>
          <AlgoSearch />
        </SearchModal>
      </Stack>
    </Stack>
  );
});
