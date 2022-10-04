import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AccountsPopover, AccountsTable } from 'components/accounts';
import dayjs from 'dayjs';

export default function DomainListings({
  liveDomains,
  instance,
  instanceDomains,
  devDomains,
  getInstanceDomains,
  deleteDomain,
  loading,
}) {
  const router = useRouter();

  const { zuid } = router.query;

  useEffect(() => {
    // access necessary endpoints
    getInstanceDomains();
  }, [instanceDomains?.length, zuid, instance?.ZUID]);

  const ROWS_LIVE_DOMAINS = liveDomains?.map((e) => {
    return {
      ...e,
      id: e.ZUID || Math.random(),
    };
  });

  const ROWS_DEV_DOMAINS = devDomains?.map((e) => {
    return {
      ...e,
      id: e.ZUID || Math.random(),
    };
  });

  const COLUMNS_DEV_DOMAINS = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 500,
      editable: false,
      sortable: false,
      renderHeader: () => (
        <Typography variant="body1">Stage Preview Domains</Typography>
      ),
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.domain}</Typography>;
      },
    },
    {
      field: 'branch',
      headerName: 'Branch',
      width: 300,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Branch</Typography>,
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.branch}</Typography>;
      },
    },
    {
      field: 'createAt',
      headerName: 'Created On',
      width: 300,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Created On</Typography>,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {dayjs(params.row.createdAt).format('MMM DD, YYYY')}
          </Typography>
        );
      },
    },

    {
      field: 'action',
      headerName: '',
      width: 110,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        const data = params.row;
        const action = [
          { title: 'Delete Domain', action: () => deleteDomain(data.ZUID) },
        ];
        return (
          <AccountsPopover
            title={
              <Button variant="text" color="primary">
                <MoreVertIcon color="disabled" />
              </Button>
            }
            id={'actions'}
            items={action}
            colorInvert={false}
          />
        );
      },
    },
  ];
  const COLUMNS_LIVE_DOMAINS = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 500,
      editable: false,
      sortable: false,
      renderHeader: () => (
        <Typography variant="body1">Production Live Domains</Typography>
      ),
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.domain}</Typography>;
      },
    },
    {
      field: 'branch',
      headerName: 'Branch',
      width: 300,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Branch</Typography>,
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.branch}</Typography>;
      },
    },
    {
      field: 'createAt',
      headerName: 'Created On',
      width: 300,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Created On</Typography>,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {dayjs(params.row.createdAt).format('MMM DD, YYYY')}
          </Typography>
        );
      },
    },

    {
      field: 'action',
      headerName: '',
      width: 110,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        const data = params.row;
        const action = [
          { title: 'Delete Domain', action: () => deleteDomain(data.ZUID) },
        ];
        return (
          <AccountsPopover
            title={
              <Button variant="text" color="primary">
                <MoreVertIcon color="disabled" />
              </Button>
            }
            id={'actions'}
            items={action}
            colorInvert={false}
          />
        );
      },
    },
  ];

  return (
    <>
      <Stack p={4}>
        <AccountsTable
          loading={loading}
          rows={ROWS_LIVE_DOMAINS}
          columns={COLUMNS_LIVE_DOMAINS}
          pageSize={100}
          autoHeight={true}
        />
      </Stack>
      <Stack p={4}>
        <AccountsTable
          loading={loading}
          rows={ROWS_DEV_DOMAINS}
          columns={COLUMNS_DEV_DOMAINS}
          pageSize={100}
          autoHeight={true}
        />
      </Stack>
      {/* <Box>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Grid item>
            <Typography variant="h5">Production Live Domains</Typography>
          </Grid>
          <Grid item>
            <AddDomainBtn
              text={'add live domain'}
              branch={'live'}
              variant={'contained'}
              onclick={handleAddDomain}
            />
          </Grid>
        </Grid>
        <DomainTable
          deleteDomain={deleteDomain}
          rows={liveDomains}
          caption={
            'Production Live domains will only display live published content'
          }
        />
      </Box> */}
      {/* <Box>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Grid item>
            <Typography variant="h5">Stage Preview Domains</Typography>
          </Grid>
          <Grid item>
            <AddDomainBtn
              text={'add dev domain'}
              branch={'dev'}
              variant={'contained'}
              onclick={handleAddDomain}
            />
          </Grid>
        </Grid>
        <DomainTable
          deleteDomain={deleteDomain}
          rows={devDomains}
          caption={
            'Stage Preview & Webengine domains provide a preview of current published content along with any new saved drafts of content that is not yet live'
          }
        />
      </Box> */}
    </>
  );
}
