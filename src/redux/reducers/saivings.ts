import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const saivingsSlicer = createSlice({
  name: "saivings",
  initialState,
  reducers: {
    setSaivings: (state: number, action: PayloadAction<number>) => {
      return action.payload;
    },
    resetSaivings: (state: number, action: PayloadAction<number>) => {
        return 0;
      },
  },
});

const saivingsReducer = saivingsSlicer.reducer;
export const { setSaivings, resetSaivings } = saivingsSlicer.actions;
export default saivingsReducer;
