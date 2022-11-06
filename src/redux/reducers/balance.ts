import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const balanceSlicer = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state: number, action: PayloadAction<number>) => {
      return action.payload;
    },
    resetBalance: (state: number, action: PayloadAction<number>) => {
        return 0;
      },
  },
});

const balanceReducer = balanceSlicer.reducer;
export const { setBalance, resetBalance } = balanceSlicer.actions;
export default balanceReducer;
