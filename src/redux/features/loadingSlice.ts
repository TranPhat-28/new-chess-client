import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILoading {
    message: string;
}

const initialState: ILoading = {
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
