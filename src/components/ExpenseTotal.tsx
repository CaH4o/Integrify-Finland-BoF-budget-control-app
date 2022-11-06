import React from "react";
import Typography from "@mui/material/Typography";

import { tExpense } from "../types/tExpense";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

function ExpenseTotal() {
  const expenses: tExpense[] = useAppSelector(
    (state: RootState) => state.expenseReducer
  );

  return (
    <>
    
    <Typography color="textPrimary">
        Total:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(
            expenses.reduce(
              (prev, curr) => prev + curr.expenseAmount,
              0
            )
          )}
        </b>
    </Typography>
    
    </>
  );
}

export default ExpenseTotal;
