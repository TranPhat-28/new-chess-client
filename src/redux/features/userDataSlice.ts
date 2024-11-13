import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces";

const initialState: { userData: IUserData | null } = {
    userData: null,
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        removeUserData: (state) => {
            state.userData = null;
        },
        setUserData: (state, action: PayloadAction<IUserData>) => {
            state.userData = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { removeUserData, setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
