import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { CreateTicket, TicketsTable } from 'components/accounts/support';
export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';
import { AccountsHeader } from 'components/accounts';
import InstanceContainer from 'components/accounts/instances/InstanceContainer';

export default function Support() {
  const router = useRouter();
  const { zuid } = router.query;
  // const [search, setsearch] = useState('');
  const [instance, setinstance] = useState(null);

  useEffect(() => {
    setinstance(zuid);
  }, []);

  const headerProps = {
    title: 'Support',
    description: `Manage your Tickets`,
  };

  return (
    <InstanceContainer>
      <Grid container>
        <AccountsHeader {...headerProps}>
          {/* <AccountsInput
              search={search}
              setsearch={setsearch}
              placeholder=" Search users"
              width={250}
            /> */}
          <CreateTicket instanceZUID={instance} />
        </AccountsHeader>
        <Grid item xs={12}>
          <TicketsTable instanceZUID={instance} />
        </Grid>
      </Grid>
      {/* <Typography variant="h4" mb={3} color="text.secondary">
        User ZUID: {userInfo?.ZUID} User Email: {userInfo?.email}
      </Typography> */}
    </InstanceContainer>
  );
}

Support.data = {
  container: 'InstanceContainer',
};
