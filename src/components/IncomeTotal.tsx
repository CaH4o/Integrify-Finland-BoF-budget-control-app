import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { ThemeContext } from "../App";

function IncomeTotal() {
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
            manageData.incomes.reduce(
              (prev, curr) => prev + curr.incomeAmount,
              0
            )
          )}
        </b>
      </span>
      <hr />
    </Typography>
  );
}

export default IncomeTotal;
