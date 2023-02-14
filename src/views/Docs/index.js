import React from 'react';
import MainWrapper from 'layouts/Main';
import dynamic from 'next/dynamic';
import Fuse from 'fuse.js';
import { Stack, useScrollTrigger } from '@mui/material';
import { ZestyAccountsHead } from 'components/globals/ZestyAccountsHead';
import { grey } from '@mui/material/colors';

import INSTANCE_DATA from './instance.data.json';
import ACCOUNTS_DATA from './accounts.data.json';
import AUTH_DATA from './auth.data.json';

const DocsComboBox = dynamic(() =>
  import('./DocsComboBox').then((mod) => mod.DocsComboBox),
);

const SearchComponent = dynamic(() =>
  import('./SearchComponent').then((mod) => mod.SearchComponent),
);

const FolderTreeView = dynamic(() =>
  import('./FolderTreeView').then((mod) => mod.FolderTreeView),
);

const DocsPages = dynamic(() =>
  import('./DocsPages').then((mod) => mod.DocsPages),
);

const options = {
  includeScore: true,
  useExtendedSearch: true,
  includeMatches: true,
  ignoreLocation: true,
  findAllMatches: true,
  threshold: 0,
  isCaseSensitive: false,
  minMatchCharLength: 1,
  keys: ['name', 'item.name', 'item.item.name'],
};

const DOCS_DATA = [
  {
    label: 'Instance API',
    value: INSTANCE_DATA,
  },
  {
    label: 'Accounts API',
    value: ACCOUNTS_DATA,
  },
  {
    label: 'Authentication API',
    value: AUTH_DATA,
  },
];

const title = 'Docs page';
const description = 'Docs page';
const ogimage = 'Docs page';

const LeftNav = React.memo(
  ({ trigger, onChangeDropdown, setsearch, search, newTreeData }) => {
    return (
      <Stack
        sx={{
          position: 'fixed',
          top: trigger ? '8rem' : '8rem',
          bgcolor: '#fff',
          height: '100%',
          borderRight: `1px solid ${grey[200]}`,
          width: '20vw',
        }}
      >
        <Stack px={4} spacing={2} py={3}>
          <DocsComboBox onChange={onChangeDropdown} options={DOCS_DATA} />
          <SearchComponent search={search} onChange={setsearch} />
        </Stack>
        <FolderTreeView
          data={newTreeData}
          search={search}
          setsearch={setsearch}
        />
      </Stack>
    );
  },
);

const DocsView = React.memo(({ data = [] }) => {
  return (
    <Stack width={1} pl={54} pr={4}>
      <DocsPages data={data} />
    </Stack>
  );
});

const Main = ({ data = [], treeData, onChangeDropdown }) => {
  const [search, setsearch] = React.useState('');

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 5,
  });

  // const fuse = new Fuse(treeData.item, options);
  // const searchResult = fuse.search(search || '');
  // const newTreeData =
  //   searchResult.length !== 0 && search.length !== 0
  //     ? searchResult[0].item.item
  //     : searchResult.length === 0 && search.length === 0
  //     ? treeData.item
  //     : [];
  const newTreeData = treeData;

  const pageHeaderProps = {
    title,
    description,
    ogimage,
  };
  const leftNavProps = {
    trigger,
    onChangeDropdown,
    setsearch,
    search,
    newTreeData,
  };

  console.log(data, 4444);
  return (
    <MainWrapper customRouting={[]}>
      {/* page header  */}
      <ZestyAccountsHead {...pageHeaderProps} />
      {/* left navigation tree */}
      <LeftNav {...leftNavProps} />
      {/* main docs view page  */}
      <DocsView data={data} />
    </MainWrapper>
  );
};

export const Docs = React.memo(Main);
