import React from 'react';
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import {
  AccountsSelect,
  AccountTextfield,
  SettingsSelect,
  StickyTable,
} from 'components/accounts';
import * as helper from 'utils';
import { useZestyStore } from 'store';

const COLUMNS = [
  {
    id: 'keyFriendly',
    label: 'Name',
  },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'tips',
    label: 'Description',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const AccountsTextAre = ({ handleAdd }) => {
  const handleChange = (event) => {
    handleAdd(event.target.value);
  };

  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
      onChange={handleChange}
    />
  );
};
const ActionSwitcher = ({ data, setarrToSubmit, arrToSubmit }) => {
  const { dataType, options } = data;

  const OPTIONS = options?.split(',').map((e) => {
    return { value: e, label: e };
  });
  const handleAdd = (value) => {
    data['value'] = value;
    setarrToSubmit([...arrToSubmit, data]);
  };

  switch (dataType) {
    case 'checkbox':
      return (
        <Box>
          type: {dataType}
          <SettingsSelect options={OPTIONS} handleAdd={handleAdd} />
        </Box>
      );
    case 'text':
      return (
        <>
          type: {dataType}
          <AccountTextfield handleAdd={handleAdd} />
        </>
      );
    case 'dropdown':
      return (
        <>
          type: {dataType}
          <SettingsSelect options={OPTIONS} handleAdd={handleAdd} />
        </>
      );
    case 'textarea':
      return (
        <>
          type: {dataType}
          <AccountsTextAre handleAdd={handleAdd} />
        </>
      );

    default:
      return (
        <input
          type="checkbox"
          id="vehicle1"
          name="vehicle1"
          value="Bike"
        ></input>
      );
  }
};

const CustomTable = ({ data, arrToSubmit, setarrToSubmit }) => {
  const ROWS = data?.map((e) => {
    return {
      keyFriendly: e.keyFriendly,
      category: e.category,
      tips: e.tips,
      action: (
        <ActionSwitcher
          data={e}
          arrToSubmit={arrToSubmit}
          setarrToSubmit={setarrToSubmit}
        />
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

export const Settings = ({ settings = [] }) => {
  const [arrToSubmit, setarrToSubmit] = React.useState([]);
  const { ZestyAPI } = useZestyStore();
  const [search, setsearch] = React.useState('');
  const [categories, setcategories] = React.useState('general');

  const data = settings?.filter((e) => {
    if (search || categories) {
      return (
        e.keyFriendly.toLowerCase().includes(search.toLowerCase()) &&
        e.category === categories
      );
    } else {
      return settings;
    }
  });

  const dropdownList = helper.generateUniqDropdown({
    data: settings,
    property: 'category',
  });

  const updateSettings = async (data) => {
    await Promise.all(
      data.map(async (e) => {
        const res = await ZestyAPI.updateSetting(e.ZUID, e);
        console.log(res, 'Result');
      }),
    );
  };
  return (
    <Box>
      <Typography variant="h3">Settings</Typography>
      <Box display={'flex'} alignItems="center">
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={(e) => setsearch(e.target.value)}
        />

        <AccountsSelect
          list={dropdownList}
          setterFn={setcategories}
          value={categories}
          setdirty={() => {}}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            updateSettings(
              helper.removeDupsInArrObj(arrToSubmit, 'keyFriendly'),
            )
          }
        >
          Save Changes
        </Button>
      </Box>
      <CustomTable
        data={data}
        arrToSubmit={arrToSubmit}
        setarrToSubmit={setarrToSubmit}
      />
    </Box>
  );
};
