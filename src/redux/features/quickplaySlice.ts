import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMove, IQuickplayDataState } from "../../interfaces";

const initialState: IQuickplayDataState = {
    history: [],
    winner: null,
};

export const quickplaySlice = createSlice({
    name: "quickplay",
    initialState,
    reducers: {
        setEndgameResult: (state, action: PayloadAction<"black" | "white">) => {
            state.winner = action.payload;
        },
        setHistory: (state, action: PayloadAction<IMove>) => {
            state.history = [...state.history, action.payload];
        },
        resetQuickplayData: (state) => {
            state.history = [];
            state.winner = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEndgameResult, setHistory, resetQuickplayData } =
    quickplaySlice.actions;

export default quickplaySlice.reducer;
