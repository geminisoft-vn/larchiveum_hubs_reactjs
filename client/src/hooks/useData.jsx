import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import useSWR from "swr";

import request from "src/utils/request";

const fetcher = async url => {
  let headers = {};
  if (Cookies.get("__LARCHIVEUM__COOKIES")) {
    headers.Authorization = `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`;
  }
  return request.get(url, { headers }).then(res => {
    if (res.status === 200) return res.data;
  });
};

const useData = url => {
  const { data: _data, error, isLoading, mutate } = useSWR(url, fetcher);

  let data, pagination;

  if (_data) {
    data = _data.data;
    pagination = _data.pages;
  }

  return { data, pagination, error, isLoading, mutate };
};

export default useData;
