import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

export const AccountsTable = ({
  rows,
  columns,
  pageSize = 5,
  loading,
  hideFooter = true,
  autoHeight = true,
  rowHeight = 70,
}) => {
  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        border: `1px solid ${grey[200]}`,
        borderRadius: '5px',
      }}
    >
      <DataGrid
        autoHeight={autoHeight}
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: true ? 'none' : '',
          },
          '&.MuiDataGrid-root': {
            border: true ? 'none' : '',
          },
          '&.MuiDataGrid-root  .MuiDataGrid-cell   ,&.MuiDataGrid-root .MuiDataGrid-columnHeader,':
            {
              outline: 'none',
            },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rowHeight={rowHeight}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 30, 50]}
        checkboxSelection
        pagination={<></>}
        loading={loading}
        disableSelectionOnClick
        disableColumnMenu
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter={hideFooter}
      />
    </Box>
  );
};
