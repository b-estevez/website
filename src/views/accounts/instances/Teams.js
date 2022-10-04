import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import {
  AccountsHeader,
  AccountsPopover,
  AccountsTable,
  accountsValidations,
  DeleteMsg,
  FormSelect,
  SubmitBtn,
} from 'components/accounts';
import { ComboBox } from 'components/globals/ComboBox';
import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CustomTable = ({
  loading,
  data,
  handleDeleteTeamModal,
  isInstanceOwner,
  instanceUserWithRoles,
  cta,
}) => {
  const ROWS = data?.map((e) => {
    return {
      ...e,
      id: e.ZUID,
    };
  });

  console.log(data, ':::');
  const COLUMNS = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Team Name</Typography>,
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.name}</Typography>;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 600,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Description</Typography>,
      renderCell: (params) => {
        return (
          <Typography variant="body2">{params.row.description}</Typography>
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
          {
            title: 'Delete Team',
            action: () => handleDeleteTeamModal({ ZUID: data.ZUID }),
          },
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
    <Stack p={4}>
      <AccountsTable
        loading={loading}
        rows={ROWS}
        columns={COLUMNS}
        pageSize={100}
        autoHeight={true}
      />
    </Stack>
  );
};

const CustomForm = ({ onSubmit, options = [], allTeams = [] }) => {
  const [teamZUID, setteamZUID] = React.useState('');
  const formik = useFormik({
    validationSchema: accountsValidations.teams,
    initialValues: {
      roleZUID: '',
    },
    onSubmit: async (values) => {
      const newVal = { ...values, teamZUID };
      await onSubmit(newVal);
      formik.resetForm();
    },
  });

  const newOptions = options?.map((e) => {
    return { ...e, value: e.ZUID };
  });

  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box paddingBottom={1}>
          <ComboBox
            initialLabel={'Select Teams'}
            width={1}
            instances={allTeams}
            setCookies={setteamZUID}
            instanceZUID={''}
            size="medium"
          />
        </Box>
        <FormSelect
          label="Role ZUID"
          name={'roleZUID'}
          formik={formik}
          options={newOptions}
        />
        <SubmitBtn
          loading={formik.isSubmitting}
          disabled={!teamZUID || formik.isSubmitting}
        >
          Submit
        </SubmitBtn>
      </form>
    </Box>
  );
};

const Main = ({
  teams,
  getAllInstancesTeams,
  deleteTeamToInstance,
  isInstanceOwner,
  addTeamToInstance,
  instanceRoles,
  loading,
  allTeams,
  instanceUserWithRoles,
}) => {
  const handleAddTeamToInstance = async (data) => {
    await addTeamToInstance(data);
    await getAllInstancesTeams();
  };

  const handleDeleteTeamModal = async ({ ZUID }) => {
    const action = async () => {
      await deleteTeamToInstance(ZUID);
    };
    DeleteMsg({ title: 'Delete this team?', action });
    await getAllInstancesTeams();
  };

  const handleAddTeamModal = () => {
    MySwal.fire({
      title: 'Add Team to Instance',
      html: (
        <CustomForm
          onSubmit={handleAddTeamToInstance}
          options={instanceRoles}
          allTeams={allTeams}
        />
      ),
      showConfirmButton: false,
    });
  };

  const headerProps = {
    title: 'Teams',
    description: `Manage your Teams`,
  };
  return (
    <Grid container>
      <AccountsHeader {...headerProps}>
        {isInstanceOwner && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddTeamModal}
          >
            <AddIcon />
            <Typography>Add Team to Instance</Typography>
          </Button>
        )}
      </AccountsHeader>
      <Grid item xs={12}>
        <CustomTable
          instanceUserWithRoles={instanceUserWithRoles}
          loading={loading}
          data={teams}
          handleDeleteTeamModal={handleDeleteTeamModal}
          isInstanceOwner={isInstanceOwner}
          cta={
            <Button
              color="primary"
              variant="outlined"
              onClick={handleAddTeamModal}
            >
              Add Team
            </Button>
          }
        />
      </Grid>
      {/* <BaseRolesTable /> */}
    </Grid>
  );
};

export const Teams = React.memo(Main);
