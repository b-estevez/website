import React from 'react';
import { Container } from '@mui/material';
import AppBar from 'components/console/AppBar';
import Main from 'layouts/Main';
import { useZestyStore } from 'store';
import Login from 'components/console/Login';
import { InstancesApp } from 'components/accounts/instances/InstancesApp';
import { useRouter } from 'next/router';
import { Teams } from 'views/accounts';
import { ErrorMsg, SuccessMsg } from 'components/accounts';

export default function TeamsPage() {
  const [search, setsearch] = React.useState('');
  const [teams, setteams] = React.useState([]);
  const { ZestyAPI, isAuthenticated } = useZestyStore((state) => state);

  const router = useRouter();
  const { zuid } = router.query;

  const handleGetAllTeamsSuccess = (res) => {
    setteams(res.data);
  };
  const handleGetAllTeamsError = (err) => {
    console.log(err);
    ErrorMsg({ text: err.error });
  };
  const handleCreateTeamSuccess = (res) => {
    console.log(res);
    SuccessMsg({ title: 'Success' });
  };
  const handleCreateTeamError = (err) => {
    console.log(err);
    ErrorMsg({ text: err.error });
  };

  const getAllTeams = async () => {
    const res = await ZestyAPI.getAllTeams();
    !res.error && handleGetAllTeamsSuccess(res);
    res.error && handleGetAllTeamsError(res);
  };

  const createTeam = async (name) => {
    const res = await ZestyAPI.createTeam(name);
    !res.error && handleCreateTeamSuccess(res);
    res.error && handleCreateTeamError(res);
  };
  React.useEffect(() => {
    getAllTeams();
  }, []);

  const data = teams?.filter((e) => {
    if (search) {
      return (
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.ZUID.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return teams;
    }
  });

  console.log(zuid);
  return (
    <Main>
      <AppBar />

      <Container>
        {isAuthenticated ? (
          <InstancesApp>
            <Teams
              teams={data}
              getAllTeams={getAllTeams}
              createTeam={createTeam}
              setsearch={setsearch}
            />
          </InstancesApp>
        ) : (
          <Login />
        )}
      </Container>
    </Main>
  );
}
