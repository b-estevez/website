import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loading';
import { Typography } from '@mui/material';

const NoData = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      No Data
    </Typography>
  );
};

const Index = ({
  rows,
  columns,
  pagination = true,
  perPage = 10,
  loading = false,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(perPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    setPage(0);
  }, [rows]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((e) => {
                  return (
                    <TableCell
                      width={'10rem'}
                      align="left"
                      sx={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                      }}
                    >
                      {e.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: '30vh', position: 'relative' }}>
              {rows.length === 0 ? (
                <NoData />
              ) : (
                rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => {
                    return (
                      <TableRow hover>
                        {columns?.map((column) => {
                          const value = row[column.id];

                          // Check if JSX ELEMENT ex Buttons etc
                          if (React.isValidElement(value)) {
                            return <TableCell>{value}</TableCell>;
                          }
                          // Check if object for preventing Errors
                          if (typeof value === 'object') {
                            return (
                              <TableCell>
                                {JSON.stringify(value, null, 4)}
                              </TableCell>
                            );
                          }
                          return <TableCell>{value}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export const StickyTable = React.memo(Index);

Index.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
