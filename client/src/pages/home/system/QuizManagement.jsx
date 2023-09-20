import { useState } from "react";
import Cookies from "js-cookie";
import { filter } from "lodash";
import useSWR from "swr";

import { QuizzsStatistic } from "src/sections/@home/base-management";
import request from "src/utils/request";
import { useAuth, useData } from "src/hooks";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if (!array) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      if (_user) {
        return _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

const QuizManagement = () => {
  const { user } = useAuth();
  const { data: quizzes, mutate } = useSWR("/auth/statistic/quizzes?sort=createdAt|desc", (url) => {
    return request
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`,
        },
      })
      .then((res) => res.data.data);
  });

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState();

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState();

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quizzes.map((n) => n?.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizzes.length) : 0;

  const filteredUsers = applySortFilter(
    quizzes,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <QuizzsStatistic
      selected={selected}
      filterName={filterName}
      handleFilterByName={handleFilterByName}
      order={order}
      orderBy={orderBy}
      handleRequestSort={handleRequestSort}
      handleSelectAllClick={handleSelectAllClick}
      filteredUsers={filteredUsers}
      rowsPerPage={rowsPerPage}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleClick={handleClick}
      emptyRows={emptyRows}
      isNotFound={isNotFound}
      quizList={quizzes || []}
    />
  );
};

export default QuizManagement;
