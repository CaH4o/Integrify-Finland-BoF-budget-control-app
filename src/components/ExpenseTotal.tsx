import { Box, Typography } from "@mui/material";

import { tExpense } from "../types/tExpense";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

export default function ExpenseTotal() {
  const expenses: tExpense[] = useAppSelector(
    (state: RootState) => state.expenseReducer
  );

  return (
    <Box className="textCenter">
      <Typography color="textPrimary">
        Total:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(
            expenses.reduce((prev, curr) => prev + curr.expenseAmount, 0)
          )}
        </b>
      </Typography>
    </Box>
  );
}
