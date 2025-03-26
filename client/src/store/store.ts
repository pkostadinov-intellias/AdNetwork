import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import { authApi } from "@/services/authApi";
import { profileApi } from "@/services/profileApi";
import { assetApi } from "@/services/assetApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [assetApi.reducerPath]: assetApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      assetApi.middleware
    )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
