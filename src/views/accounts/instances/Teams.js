import { Box, Button, TextField } from '@mui/material';
import {
  accountsValidations,
  DeleteBtn,
  DeleteMsg,
  FormInput,
  FormSelect,
  StickyTable,
  SubmitBtn,
} from 'components/accounts';
import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const COLUMNS = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'zuid',
    label: 'Zuid',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const CustomTable = ({ data, handleDeleteTeamModal, isInstanceOwner }) => {
  const ROWS = data?.map((e) => {
    return {
      name: e.name || '-',
      description: e.description || '-',
      zuid: e.ZUID,
      action: isInstanceOwner ? (
        <Box display={'flex'}>
          <DeleteBtn onClick={() => handleDeleteTeamModal(e)} />
        </Box>
      ) : (
        '-'
      ),
    };
  });

  // const memoizeRows = React.useMemo(() => ROWS, [data]);
  // const memoizeColumns = React.useMemo(() => COLUMNS, []);

  return (
    <Box>
      <StickyTable rows={ROWS} columns={COLUMNS} />
    </Box>
  );
};

const CustomForm = ({ onSubmit, options = [] }) => {
  const formik = useFormik({
    validationSchema: accountsValidations.teams,
    initialValues: {
      teamZUID: '',
      roleZUID: '',
    },
    onSubmit: async (values) => {
      await onSubmit(values);
      formik.resetForm();
    },
  });

  const newOptions = options?.map((e) => {
    return { ...e, value: e.ZUID };
  });

  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <FormInput name={'teamZUID'} formik={formik} />
        <FormSelect
          label="Role ZUID"
          name={'roleZUID'}
          formik={formik}
          options={newOptions}
        />
        <SubmitBtn loading={formik.isSubmitting}>Submit</SubmitBtn>
      </form>
    </Box>
  );
};

const Main = ({
  setsearch,
  teams,
  getAllInstancesTeams,
  deleteTeamToInstance,
  isInstanceOwner,
  addTeamToInstance,
  instanceRoles,
}) => {
  const handleAddTeamToInstance = async (data) => {
    await addTeamToInstance(data);
    await getAllInstancesTeams();
  };

  const handleDeleteTeamModal = async ({ ZUID }) => {
    const action = async () => {
      await deleteTeamToInstance(ZUID);
    };
    DeleteMsg({ action });
    await getAllInstancesTeams();
  };

  const handleAddTeamModal = () => {
    MySwal.fire({
      title: 'Add Team to Instance',
      html: (
        <CustomForm
          onSubmit={handleAddTeamToInstance}
          options={instanceRoles}
        />
      ),
      showConfirmButton: false,
    });
  };

  return (
    <Box>
      <Box paddingY={2} display={'flex'} justifyContent={'space-between'}>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={(e) => setsearch(e.target.value)}
        />

        {isInstanceOwner && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddTeamModal}
          >
            Add Team to Instance
          </Button>
        )}
      </Box>

      <CustomTable
        data={teams}
        handleDeleteTeamModal={handleDeleteTeamModal}
        isInstanceOwner={isInstanceOwner}
      />
    </Box>
  );
};

export const Teams = React.memo(Main);
