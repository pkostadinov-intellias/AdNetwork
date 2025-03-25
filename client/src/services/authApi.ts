import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3001/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data
      })
    }),
    logout: builder.mutation<void, string>({
      query: (token) => ({
        url: "auth/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
