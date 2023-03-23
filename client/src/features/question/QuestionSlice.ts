import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "src/utilities/axiosBaseQuery";

export const questionSlice = createApi({
	reducerPath: "question",
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getAll: builder.query({
			query: (params) => ({ url: "/v1/auth/questions", method: "GET", params }),
		}),
		getOne: builder.query({
			query: (id) => ({ url: `/v1/auth/questions/${id}`, method: "GET" }),
		}),
		// updateOne: builder.query({
		//   query: (id) => ({ url: `/v1/auth/questions/${id}`, method: "GET" }),
		// }),
		// getOne: builder.query({
		//   query: (id) => ({ url: `/v1/auth/questions/${id}`, method: "GET" }),
		// }),
	}),
});

export const { useGetAllQuery, useGetOneQuery } = questionSlice;
