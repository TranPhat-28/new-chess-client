import { configureStore } from "@reduxjs/toolkit";

import quickplayReducer from "./features/quickplaySlice";
import loadingReducer from "./features/loadingSlice";
import initGameReducer from "./features/initGameSlice";
import authReducer from "./features/authSlice";
import userDataReducer from "./features/userDataSlice";

export const store = configureStore({
    reducer: {
        quickplay: quickplayReducer,
        loading: loadingReducer,
        initGame: initGameReducer,
        auth: authReducer,
        userData: userDataReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
