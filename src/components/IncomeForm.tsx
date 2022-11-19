import React, { useState } from "react";
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

import { tIncome } from "../types/tIncome";
import { addIncome } from "../redux/reducers/incomes";
import { useAppDispatch } from "../hooks/reduxHooks";

export default function IncomeForm() {
  const dispatch = useAppDispatch();
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
    dispatch(addIncome(income));
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => submit(e)}
      className="componentForm"
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
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}
