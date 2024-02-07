import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user-slice";
import friendsReducer from "./slices/friends-slice";
import nonFriendsUsersReducer from "./slices/non-friends-users-slice";

export const store = configureStore({
  reducer: {
    userReducer,
    friendsReducer,
    nonFriendsUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
