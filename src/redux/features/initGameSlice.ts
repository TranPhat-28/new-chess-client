import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isInitialized: false,
};

export const initGameSlice = createSlice({
    name: "initGame",
    initialState,
    reducers: {
        setGameIsInitialized: (state) => {
            state.isInitialized = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setGameIsInitialized } = initGameSlice.actions;

export default initGameSlice.reducer;
