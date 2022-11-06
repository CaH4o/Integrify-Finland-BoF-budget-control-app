import React from "react";
import Typography from "@mui/material/Typography";

import { tIncome } from "../types/tIncome";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

function IncomeTotal() {
  const incomes: tIncome[] = useAppSelector(
    (state: RootState) => state.incomeReducer
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
            incomes.reduce(
              (prev, curr) => prev + curr.incomeAmount,
              0
            )
          )}
        </b>
      </Typography>
    </>
  );
}

export default IncomeTotal;
