import React, { useMemo } from "react";
import { Pagination as MUIPagination } from "@mui/material";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { totalItems, perPage, page, setParams } = props;

  const pageCount = useMemo(() => {
    return Math.ceil(totalItems / perPage);
  }, [totalItems, perPage]);

  const handleChange = (event, page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <MUIPagination count={pageCount} page={page} onChange={handleChange} />
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number,
  setParams: PropTypes.func,
};

export default Pagination;
