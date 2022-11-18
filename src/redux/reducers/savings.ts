import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tSavingsTarget } from "../../types/tSavingsTarget";

const initialState: tSavingsTarget = {
  savings: 0,
  target: 0,
};

const savingsSlicer = createSlice({
  name: "savingsTatget",
  initialState,
  reducers: {
    setSavings: (state: tSavingsTarget, action: PayloadAction<number>) => {
      state.savings = action.payload;
    },
    setTarget: (state: tSavingsTarget, action: PayloadAction<number>) => {
      state.target = action.payload;
    },
    resetSavings: (state: tSavingsTarget, action: PayloadAction<number>) => {
      state.savings = 0;
    },
  },
});

const savingsReducer = savingsSlicer.reducer;
export const { setSavings, resetSavings, setTarget } = savingsSlicer.actions;
export default savingsReducer;
