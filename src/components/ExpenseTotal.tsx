import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { ThemeContext } from "../App";

function ExpenseTotal() {
  const manageData = useContext(ThemeContext);

  return (
    <Typography color="textPrimary">
      <hr />
      <span>
        Total:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(
            manageData.expenses.reduce(
              (prev, curr) => prev + curr.expenseAmount,
              0
            )
          )}
        </b>
      </span>
      <hr />
    </Typography>
  );
}

export default ExpenseTotal;
