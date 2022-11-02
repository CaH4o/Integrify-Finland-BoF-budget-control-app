import React, { useState, useContext } from "react";
import {
  Box,
  OutlinedInput,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { ThemeContext } from "../App";
import { tIncome } from "../types/tIncome";
import IncomeTable from "./IncomeTable";
import IncomeTotal from "./IncomeTotal";

function Income() {
  const manageData = useContext(ThemeContext);
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [incomeDate, setIncomeDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (incomeAmount <= 0) {
      setMessage("Error: The amount is incorrect");
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    const income: tIncome = {
      id: Date.now().toString(),
      incomeSource,
      incomeAmount,
      incomeDate,
    };
    e.currentTarget.reset();
    manageData.setIncomes([income, ...manageData.incomes]);
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => submit(e)}
      id="formIncome"
      sx={{ bgcolor:"background.default" }}
    >
      <TextField
        sx={{ m: 1 }}
        required
        label="Income source"
        placeholder="Salary"
        type="text"
        onChange={(e) => setIncomeSource(e.target.value)}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="incomeAmount">Amount of income</InputLabel>
        <OutlinedInput
          label="Amount of income"
          type="number"
          id="incomeAmount"
          onChange={(e) => setIncomeAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        label="Date of income"
        type="date"
        onChange={(e) => setIncomeDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        sx={{ m: 1 }}
        type="submit"
        id="btn_addIncome"
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
      >
        Add income
      </Button>
      <IncomeTotal />
      <IncomeTable />
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}

export default Income;
