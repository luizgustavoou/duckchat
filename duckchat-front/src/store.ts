import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import friendsReducer from "./slices/friends-slice";
import nonFriendsUsersReducer from "./slices/non-friends-users-slice";

export const store = configureStore({
  reducer: {
    authReducer,
    friendsReducer,
    nonFriendsUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
