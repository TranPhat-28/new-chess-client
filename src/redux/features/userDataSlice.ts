import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserData {
    name: string;
    email: string;
    dateJoined: string;
    picture: string;
    provider: string;
}

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
            // Get the good quality img
            // state.userData.img = state.userData.img.replace("s96-c", "s192-c");
        },
    },
});

// Action creators are generated for each case reducer function
export const { removeUserData, setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
