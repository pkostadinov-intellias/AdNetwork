import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";

const ENDPOINT = "messages";

const TAG = "ChatHistory";

export const messengerApi = createApi({
  reducerPath: "messengerApi",
  baseQuery: authBaseQuery,
  tagTypes: [TAG],
  endpoints: (builder) => ({
    getChatHistory: builder.query({
      query: (chatId) => ({
        url: `${ENDPOINT}/chat-id/${chatId}`,
        method: "GET"
      }),
      providesTags: (result, error, chatId) => [{ type: TAG, id: chatId }]
    })
  })
});

export const { useGetChatHistoryQuery } = messengerApi;
