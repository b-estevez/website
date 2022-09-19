import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  accountsValidations,
  AccountTextfield,
  ColorToggleButton,
  DeleteBtn,
  DeleteMsg,
  FormInput,
  FormSelect,
  SettingsSelect,
  StickyTable,
  SubmitBtn,
} from 'components/accounts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import * as helpers from 'utils';

const MySwal = withReactContent(Swal);

const COLUMNS = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'token',
    label: 'Token',
  },
  {
    id: 'role',
    label: 'Role',
  },
  {
    id: 'expiry',
    label: 'Expires',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const CreateTokenForm = ({ onSubmit, options }) => {
  const formik = useFormik({
    validationSchema: accountsValidations.createToken,
    initialValues: {
      name: '',
      roleZUID: '',
    },
    onSubmit: async (values) => {
      await onSubmit(values);
      formik.resetForm();
    },
  });

  const newOptions = options.map((e) => {
    return { ...e, value: e.ZUID };
  });
  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <FormInput name={'name'} formik={formik} />
        <FormSelect
          label="Role"
          name={'roleZUID'}
          formik={formik}
          options={newOptions}
        />
        <SubmitBtn loading={formik.isSubmitting}>Submit</SubmitBtn>
      </form>
    </Box>
  );
};

const CustomTable = ({
  data = [],
  roles = [],
  handleDeleteToken,
  handleUpdateToken,
  isInstanceOwner,
  loading,
}) => {
  const ROWS = data?.map((e) => {
    const role = roles.find((x) => x.ZUID === e.roleZUID)?.name;
    return {
      name: e.name || '-',
      token: e.token || '-',
      role: role || '-',
      expiry: dayjs(e.expiry).format('MMMM D, YYYY') || '-',
      action: isInstanceOwner ? (
        <Box display={'flex'} gap={4}>
          <Button
            onClick={() => handleUpdateToken(e)}
            color="info"
            variant="contained"
            type="button"
          >
            <AutorenewIcon color="inherit" sx={{ marginRight: 1 }} />
            Renew
          </Button>
          <DeleteBtn onClick={() => handleDeleteToken(e)}> </DeleteBtn>
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
      <StickyTable loading={loading} rows={ROWS} columns={COLUMNS} />
    </Box>
  );
};

const BasicCard = ({ title, body }) => {
  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" mb={4}>
          {title}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

const SettingsToggle = ({ data, arrToSubmit, setarrToSubmit }) => {
  const { options, value, dataType } = data;

  const handleAdd = async (value) => {
    data['value'] = value;
    setarrToSubmit([...arrToSubmit, data]);
  };
  if (dataType === 'text') {
    return (
      <AccountTextfield
        name={data?.keyFriendly}
        value={value}
        handleAdd={handleAdd}
      />
    );
  }

  if (dataType === 'dropdown') {
    return (
      <SettingsSelect
        value={value}
        name={data?.keyFriendly}
        options={helpers.OPTIONS(options, ';')}
        handleAdd={handleAdd}
      />
    );
  }

  return (
    <ColorToggleButton
      value={value}
      options={helpers.OPTIONS(options, ',')}
      handleAdd={handleAdd}
    />
  );
};

const SettingComp = ({
  arrToSubmit,
  setarrToSubmit,
  data,
  isDataChange,
  handleUpdateSetting,
}) => {
  return (
    <Box
      width={1}
      mb={2}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>{data.keyFriendly}</Typography>

      <Box display="flex" gap={2}>
        <SettingsToggle
          arrToSubmit={arrToSubmit}
          setarrToSubmit={setarrToSubmit}
          data={data}
        />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ visibility: isDataChange ? 'visible' : 'hidden' }}
          onClick={() => handleUpdateSetting(data)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
const ApiDescription = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <BasicCard
          title={'Read/Write Rest Api Info'}
          body={
            <Typography>
              The{' '}
              <Link href="https://zesty.org/apis/auth-api#token-based-authentication">
                {' '}
                Access token
              </Link>{' '}
              feature is beta and is recommended for use with the{' '}
              <Link href="https://zesty.org/tools/atom-package">
                Atom IDE plugin
              </Link>{' '}
              , experimenting with CI/CD flows, and/or{'  '}
              <Link href="https://github.com/zesty-io/node-sdk">
                Node SDK
              </Link>{' '}
              script usage. This feature will be augmented in the future. After
              that automated production flows using tokens will be generally
              available.
            </Typography>
          }
        />
      </Grid>

      <Grid item xs={6}>
        <BasicCard
          title={'WebEngine Mode Endpoints'}
          body={
            <>
              <Typography>
                The{' '}
                <Link href="https://zesty.org/services/web-engine/modes">
                  Web Engine
                </Link>{' '}
                has 3 modes (Traditional(default), Hybrid, Headless). The{' '}
                <Link href="https://zesty.org/apis/json-endpoints">
                  Instant API endpoints
                </Link>{' '}
                are reliant on the{' '}
                <Typography
                  display="inline-block"
                  fontWeight="bolder"
                  color="text.secondary"
                >
                  Access to Basic JSON API for content
                </Typography>{' '}
                to be on. Docs for{' '}
                <Link href="https://instances-api.zesty.org/#9db975df-8f8b-4a6a-b820-2d684a5e0da3">
                  updating setting endpoint
                </Link>
              </Typography>
              <Typography>
                All of the other endpoints are reliant on the webengine mode
                setting set to Headless or Hybrid. Once the setting is turned on
                you can go to the /-/headless/ endpoint of the instance. Which
                is structured using the {`instance's`} domain followed by the
                endpoint. Sample:
                <Link href="https://photoblog.zesty.dev/-/headless/">
                  https://photoblog.zesty.dev/-/headless/
                </Link>
              </Typography>
            </>
          }
        />
      </Grid>
    </Grid>
  );
};

const ApiSettings = ({
  settings,
  arrToSubmit,
  setarrToSubmit,
  updateSetting,
}) => {
  const tableLeft = settings.filter(
    (e) => e.dataType === 'dropdown' || e.dataType === 'checkbox',
  );
  const tableRight = settings.filter((e) => e.dataType === 'text');

  const handleUpdateSetting = async (data) => {
    updateSetting(data);
    setarrToSubmit(arrToSubmit.filter((e) => e.ZUID !== data.ZUID));
  };
  return (
    <Box my={4} paddingBottom={4}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" textAlign={'center'} mb={4}>
          Api Settings
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            {tableLeft.map((e) => {
              const isDataChange = helpers
                .removeDupsInArrObj(arrToSubmit, 'keyFriendly')
                .find((x) => x.ZUID === e.ZUID);
              return (
                <SettingComp
                  isDataChange={isDataChange}
                  data={e}
                  arrToSubmit={arrToSubmit}
                  setarrToSubmit={setarrToSubmit}
                  handleUpdateSetting={handleUpdateSetting}
                />
              );
            })}
          </Grid>
          <Grid item xs={6}>
            {tableRight.map((e) => {
              const isDataChange = helpers
                .removeDupsInArrObj(arrToSubmit, 'keyFriendly')
                .find((x) => x.ZUID === e.ZUID);
              return (
                <SettingComp
                  isDataChange={isDataChange}
                  data={e}
                  arrToSubmit={arrToSubmit}
                  setarrToSubmit={setarrToSubmit}
                  handleUpdateSetting={handleUpdateSetting}
                />
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export const Apis = ({
  tokens,
  instanceRoles,
  isInstanceOwner,
  createToken,
  deleteToken,
  updateToken,
  loading,
  settings,
  arrToSubmit,
  setarrToSubmit,
  updateSetting,
}) => {
  const handleCreateTokenModal = () => {
    MySwal.fire({
      title: 'Create Token',
      html: <CreateTokenForm onSubmit={createToken} options={instanceRoles} />,
      showConfirmButton: false,
    });
  };
  const handleDeleteToken = (data) => {
    const val = { tokenZUID: data.ZUID };
    const action = () => {
      deleteToken(val);
    };
    DeleteMsg({ title: 'Delete this token?', action });
  };
  const handleUpdateToken = (data) => {
    const val = { tokenZUID: data.ZUID };
    updateToken(val);
  };
  return (
    <Stack>
      <ApiDescription />
      <Stack spacing={1}></Stack>
      <Stack direction="row" width="100%" my={1}>
        {isInstanceOwner && (
          <Button
            onClick={handleCreateTokenModal}
            color="secondary"
            variant="contained"
            type="button"
            sx={{ ml: 'auto' }}
          >
            Create Token
          </Button>
        )}
      </Stack>

      <CustomTable
        loading={loading}
        isInstanceOwner={isInstanceOwner}
        data={tokens}
        roles={instanceRoles}
        handleDeleteToken={handleDeleteToken}
        handleUpdateToken={handleUpdateToken}
      />
      <ApiSettings
        settings={settings}
        arrToSubmit={arrToSubmit}
        setarrToSubmit={setarrToSubmit}
        updateSetting={updateSetting}
      />
      <ApiDocs />
    </Stack>
  );
};

const ApiDocs = () => {
  return (
    <Paper sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h5" textAlign={'center'} mb={4}>
        Endpoints and Token Docs
      </Typography>
      <Grid container spacing={4}>
        {apiDocsArr.map((e) => {
          return (
            <Grid
              item
              xs={12}
              sx={{}}
              width={1}
              display="grid"
              gridTemplateColumns={'1fr 1fr'}
            >
              <Typography pl={4}>{e.label}</Typography>

              <Box>
                <Button color="secondary" href={e.url}>
                  Learn more <ArrowRightAltIcon />
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

const apiDocsArr = [
  {
    label: 'Access token usage and exception',
    url: 'https://zesty.org/quick-start-guide/instance-settings#access-tokens',
  },
  {
    label: 'JSON Endpoint Info',
    url: 'https://zesty.org/apis/json-endpoints',
  },
  {
    label: 'WebEngine Mode',
    url: 'https://zesty.org/services/web-engine/modes',
  },
  {
    label: 'Original URL information',
    url: 'https://zesty.org/services/web-engine/modes#traditional-mode-traditional-default',
  },
  {
    label: 'Headless URL information',
    url: 'https://zesty.org/services/web-engine/modes#headless-mode-headless',
  },
];
