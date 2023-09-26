import React from "react";
// @mui
import {
  Box,
  Card,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";

import Iconify from "src/components/iconify";
// components
import Label from "src/components/label";
import Scrollbar from "src/components/scrollbar";
// sections
import {
  BaseManagementHead,
  BaseManagementToolbar,
} from "src/sections/@home/base-management";
import UserService from "src/services/UserService";
import { useEventBus } from "src/hooks";
import { mutate } from "swr";
import moment from "moment";
import { DocumentService } from "src/services";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  { id: "title", label: "Document Title", alignRight: false },
  { id: "createdAt", label: "Date Created", alignRight: false },
  { id: "userId", label: "Writer", alignRight: false },
  { id: "actions", label: "Actions", alignRight: false },
  { id: "" },
];

const DocumentStatistic = ({
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
  documentList,
}) => {

  const { $emit } = useEventBus();

  const content = (
    <Box sx={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
      <Typography variant="body1">
        {`Are you sure you want to delete the selected document?`}
      </Typography>
      <Typography variant="body1">
        {`If you choose to delete it, it cannot be recovered.`}
      </Typography>
    </Box>
  );

  const handleDelete = (documentId) => {
    if (!documentId) return;
    $emit("alert/open", {
      title: "Delete document",
      content: "Do you want to delete this document?",
      okText: "Delete",
      okCallback: () => {
        DocumentService.delete(documentId).then(() => {
          mutate("/auth/statistic/documents?sort=createdAt|desc");
        });
      },
    });
  };

  const handleDeleteMany = (ids, callback) => {
    if (!ids) return;
    $emit("alert/open", {
      title: "Delete document",
      content,
      okText: "Delete",
      okCallback: () => {
        DocumentService.deleteMany(ids)
          .then(() => {
            return mutate("/auth/statistic/documents?sort=createdAt|desc");
          })
          .then(() => {
            if (callback) callback();
          });
      },
    });
  };

  return (
    <Container>
      <Card>
        <BaseManagementToolbar
          selected={selected}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchContent={"Search Document..."}
          handleDeleteMany={handleDeleteMany}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table size="medium">
              <BaseManagementHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={documentList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, title, createdAt, user } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

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
                            onChange={(event) => handleClick(event, id)}
                          />
                        </TableCell>

                        <TableCell><Link to={`/document-viewer/${id}`} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>{title}</Link></TableCell>

                        <TableCell align="left">{moment(createdAt).format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="left">{user?.username}</TableCell>

                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(id)}>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={documentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Scrollbar>
      </Card>
    </Container>
  );
};

export default DocumentStatistic;
