import { enqueueSnackbar } from "notistack";
import request from "src/utils/request";
import useSWR from "swr";

import Cookies from "js-cookie";

const fetcher = (url) => {
  let headers = {};
  if (Cookies.get("__LARCHIVEUM__COOKIES")) {
    headers.Authorization = `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`;
  }
  return request
    .get(url, { headers })
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data) {
          enqueueSnackbar(error.response.data.error.message, {
            variant: "error",
          });
        }
      }
    });
};

const useData = (url) => {
  const { data: _data, error, isLoading, mutate } = useSWR(url, fetcher);

  let data, pagination;

  if (_data) {
    data = _data.data;
    pagination = _data.pagination;
  }

  return { data, pagination, error, isLoading, mutate };
};

export default useData;