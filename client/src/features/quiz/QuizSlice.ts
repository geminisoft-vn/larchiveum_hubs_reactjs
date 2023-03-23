import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "src/utilities/axiosBaseQuery";

export const quizSlice = createApi({
	reducerPath: "quiz",
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getAll: builder.query({
			query: (params) => ({ url: "/v1/auth/quizs", method: "GET", params }),
		}),
		getOne: builder.query({
			query: (id) => ({ url: `/v1/auth/quizs/${id}`, method: "GET" }),
		}),
		// updateOne: builder.query({
		//   query: (id) => ({ url: `/v1/auth/quizs/${id}`, method: "GET" }),
		// }),
		// getOne: builder.query({
		//   query: (id) => ({ url: `/v1/auth/quizs/${id}`, method: "GET" }),
		// }),
	}),
});

export const { useGetAllQuery, useGetOneQuery } = quizSlice;
