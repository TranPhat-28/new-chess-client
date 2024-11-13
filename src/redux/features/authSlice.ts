import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthData } from "../../interfaces";

const initialState: IAuthData = {
    email: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeAuth: (state) => {
            state.email = null;
            state.token = null;
        },
        setAuth: (state, action: PayloadAction<IAuthData>) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { removeAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
