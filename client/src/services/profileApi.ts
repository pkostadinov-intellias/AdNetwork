import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";

const ENDPOINT = "users";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: authBaseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${ENDPOINT}`,
      providesTags: ["User"]
    }),

    getUserById: builder.query({
      query: (id: string) => `${ENDPOINT}/id/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }]
    }),

    getUserByUsername: builder.query({
      query: (username: string) => `${ENDPOINT}/username/${username}`,
      providesTags: (result, error, username) => [
        { type: "User", id: username }
      ]
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: userData
      }),
      invalidatesTags: ["User"]
    }),

    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${ENDPOINT}/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }]
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, "User"]
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = profileApi;
