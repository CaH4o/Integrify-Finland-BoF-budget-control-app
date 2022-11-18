import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tIncome } from "../../types/tIncome";

const initialState: tIncome[] = [];

const incomeSlicer = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncome: function (state: tIncome[], action: PayloadAction<tIncome>) {
      return [...state, action.payload];
    },
    deleteIncome: function (state: tIncome[], action: PayloadAction<string>) {
      return state.filter((item: tIncome) => item.id !== action.payload);
    },
    sortIncomeByAmount: function (
      state: tIncome[],
      action: PayloadAction<string>
    ) {
      if (action.payload === "asc") {
        state.sort((a, b) => a.incomeAmount - b.incomeAmount);
      } else {
        state.sort((a, b) => b.incomeAmount - a.incomeAmount);
      }
    },
  },
});

const incomeReducer = incomeSlicer.reducer;
export const { addIncome, deleteIncome, sortIncomeByAmount } =
  incomeSlicer.actions;
export default incomeReducer;
