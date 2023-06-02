import { sentenceCase } from "change-case";
// @mui
import {
  Card,
  Table,
  Tooltip,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "src/sections/@home/user";
import { red } from "@mui/material/colors";

const TABLE_HEAD = [
  { id: "username", label: "Username", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const Users = ({
  selected,
  filterName,
  handleFilterByName,
  order,
  orderBy,
  handleRequestSort,
  handleSelectAllClick,
  filteredUsers,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClick,
  emptyRows,
  isNotFound,
  users,
}) => {
  return (
    <Container>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, username, role, blocked, email, confirmed } =
                      row;
                    const selectedUser = selected.indexOf(username) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, username)}
                          />
                        </TableCell>

                        <TableCell>{username}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role.name}</TableCell>

                        <TableCell align="left">
                          {confirmed ? "Yes" : "No"}
                        </TableCell>

                        <TableCell align="left">
                          <Label color={blocked ? "error" : "success"}>
                            {sentenceCase(blocked ? "Blocked" : "Active")}
                          </Label>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton>
                              <Iconify
                                icon={"eva:trash-2-outline"}
                                sx={{ color: red[500] }}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default Users;
