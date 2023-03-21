import axiosInstance from "./axiosInstance";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const res = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      if (res.data.result === "ok") return { data: res.data.data };
      return { data: [] };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
