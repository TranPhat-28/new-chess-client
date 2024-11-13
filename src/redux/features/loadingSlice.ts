import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    message: "Loading",
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoadingMessage } = loadingSlice.actions;

export default loadingSlice.reducer;
