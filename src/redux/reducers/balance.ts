import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const balanceSlicer = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state: number, action: PayloadAction<number>) => {
      return action.payload;
    },
    addBalance: (state: number, action: PayloadAction<number>) => {
      return state + action.payload;
    },
    resetBalance: (state: number, action: PayloadAction<number>) => {
        return 0;
      },
  },
});

const balanceReducer = balanceSlicer.reducer;
export const { setBalance, addBalance, resetBalance } = balanceSlicer.actions;
export default balanceReducer;
