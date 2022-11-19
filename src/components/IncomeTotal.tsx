import { Box, Typography } from "@mui/material";

import { tIncome } from "../types/tIncome";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

export default function IncomeTotal() {
  const incomes: tIncome[] = useAppSelector(
    (state: RootState) => state.incomeReducer
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
            incomes.reduce((prev, curr) => prev + curr.incomeAmount, 0)
          )}
        </b>
      </Typography>
    </Box>
  );
}
