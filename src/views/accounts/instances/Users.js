import React from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  accountsValidations,
  FormInput,
  DeleteMsg,
  SubmitBtn,
  FormSelect,
  AccountsTable,
  AccountSelect,
} from 'components/accounts';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AddIcon from '@mui/icons-material/Add';
import { baseroles } from 'components/accounts/users/baseroles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useFormik } from 'formik';
import * as helpers from 'utils';
import { hashMD5 } from 'utils/Md5Hash';
import dayjs from 'dayjs';
import { AccountsHeader } from 'components/accounts/ui/header';
import { AccountsPopover } from 'components/accounts/ui/popover';

const MySwal = withReactContent(Swal);

const RoleSwitcher = ({ role, handleOnChange, instanceRoles }) => {
  switch (role) {
    case 'Owner':
      return <>{role}</>;
    default:
      return (
        <AccountSelect
          options={instanceRoles}
          label="Role"
          onChange={handleOnChange}
          value={role}
        />
      );
  }
};
const CustomTable = ({
  data,
  handleUpdateRole,
  handleDeleteRole,
  instanceRoles,
  isOwner,
  loading,
}) => {
  const ROWS = data?.map((e) => {
    return { ...e, id: e.ZUID };
  });

  const COLUMNS = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Name</Typography>,
      renderCell: (params) => {
        const name = `${params.row.firstName} ${params.row.lastName}`;
        const email = `${params.row.email}`;
        const profileUrl =
          'https://www.gravatar.com/avatar/' + hashMD5(params.row?.email);
        return (
          <Stack direction="row" alignItems={'center'} gap={2}>
            <img
              src={profileUrl}
              alt="User"
              height={40}
              width={40}
              style={{ borderRadius: '50%' }}
            />
            <Stack>
              <Typography variant="body2">{name}</Typography>
              <Typography variant="caption" color={'GrayText'}>
                {email}
              </Typography>
            </Stack>
          </Stack>
        );
      },
    },

    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      editable: false,
      sortable: false,
      renderHeader: () => <Typography variant="body1">Role</Typography>,
      renderCell: (params) => {
        const e = params.row;
        const handleOnChange = (data) => {
          const val = {
            newRoleZUID: data.id,
            userZUID: e.ZUID,
            oldRoleZUID: e.role.ZUID,
          };

          handleUpdateRole(val);
        };

        const role = isOwner
          ? RoleSwitcher({
              role: e.role.name,
              handleOnChange,
              instanceRoles,
            })
          : e.role.name;
        return role;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date Added',
      width: 200,
      editable: false,
      renderHeader: () => <Typography variant="body1">Date Added</Typography>,
      renderCell: (params) => {
        const date = dayjs(params.row.createdAt).format('MMM DD, YYYY');
        return <Typography variant="body2">{date}</Typography>;
      },
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 200,
      editable: false,
      renderHeader: () => <Typography variant="body1">Last Login</Typography>,
      renderCell: (params) => {
        const date = dayjs(params.row.lastLogin).format('MMM DD, YYYY');
        return <Typography variant="body2">{date}</Typography>;
      },
    },

    {
      field: 'action',
      headerName: '',
      width: 110,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        const handleDeleteUser = () => {
          const e = params.row;
          const roleZUID = instanceRoles.find(
            (x) => x.name === e.role.name,
          )?.ZUID;
          const data = { roleZUID, userZUID: e.ZUID };
          const action = () => {
            handleDeleteRole(data);
          };
          DeleteMsg({ action });
        };

        const action = [
          { title: 'Delete User', action: isOwner ? handleDeleteUser : null },
          {
            title: 'Email',
            url: () => window.open(`mailto:${params.row.email}`),
          },
        ];

        return (
          <>
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
          </>
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
        autoHeight={false}
      />
    </Stack>
  );
};

const CustomForm = ({ onSubmit, options, instanceZUID }) => {
  const formik = useFormik({
    validationSchema: accountsValidations.email,
    initialValues: {
      email: '',
      name: '',
      accessLevel: '',
    },
    onSubmit: async (values) => {
      const val = {
        inviteeName: values.name,
        inviteeEmail: values.email,
        entityZUID: instanceZUID,
        accessLevel: values.accessLevel,
      };
      await onSubmit(val);
      formik.resetForm();
    },
  });

  const newOptions = options.map((e) => {
    return { ...e, value: e.accessLevel };
  });

  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <FormInput name={'name'} formik={formik} />
        <FormInput name={'email'} formik={formik} />
        <FormSelect
          label="Role"
          name={'accessLevel'}
          formik={formik}
          options={newOptions}
        />
        <SubmitBtn loading={formik.isSubmitting}>Submit</SubmitBtn>
      </form>
    </Box>
  );
};
const Index = ({
  roles,
  updateRole,
  deleteUserRole,
  instanceRoles,
  createInvite,
  isOwner,
  instanceZUID,
  loading,
  search,
  setsearch,
}) => {
  const handleUpdateRole = (data) => {
    updateRole(data);
  };
  const handleDeleteRole = (data) => {
    deleteUserRole(data);
  };

  const handleInviteUserModal = (createInvite, options, instanceZUID) => {
    MySwal.fire({
      title: 'Invite User',
      html: (
        <CustomForm
          onSubmit={createInvite}
          options={options}
          instanceZUID={instanceZUID}
        />
      ),
      showConfirmButton: false,
    });
  };

  // Remove not valid user using email check
  const data = roles.filter((e) => {
    return helpers.validateEmail(e.email);
  });

  const headerProps = {
    title: 'Users',
    description: 'Manage your users and their permissions',
  };

  return (
    <Grid container>
      <AccountsHeader {...headerProps}>
        <TextField
          size="small"
          placeholder=" Search Users"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="disabled" />,
          }}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            handleInviteUserModal(createInvite, baseroles, instanceZUID)
          }
          sx={{ gap: 1 }}
        >
          <AddIcon />
          <Typography>Invite user</Typography>
        </Button>
      </AccountsHeader>
      <Grid item xs={12}>
        <CustomTable
          setsearch={setsearch}
          data={data}
          handleUpdateRole={handleUpdateRole}
          handleDeleteRole={handleDeleteRole}
          instanceRoles={instanceRoles}
          isOwner={isOwner}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};
export const Users = React.memo(Index);
