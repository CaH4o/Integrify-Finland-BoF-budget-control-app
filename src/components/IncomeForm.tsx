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

import { RootState } from "../redux/store";
import { tIncome } from "../types/tIncome";
import { pIncomeForm } from "../types/pIncomeForm";
import { addIncome, editIncome } from "../redux/reducers/incomes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export default function IncomeForm({ income, setOpen }: pIncomeForm) {
  const dispatch = useAppDispatch();
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );
  const [incomeSource, setIncomeSource] = useState<string>(
    income ? income.incomeSource : ""
  );
  const [incomeAmount, setIncomeAmount] = useState<number>(
    income ? income.incomeAmount : 0
  );
  const [incomeDate, setIncomeDate] = useState<string>(
    income ? income.incomeDate : ""
  );
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
    const sendIncome: tIncome = {
      id: income ? income.id : Date.now().toString(),
      incomeSource,
      incomeAmount,
      incomeDate,
    };
    if (income) {
      if (balance < income.incomeAmount - incomeAmount) {
        setMessage("Error: The amount is less then balance");
        setTimeout(function () {
          setMessage("");
        }, 3000);
        return;
      } else {
        dispatch(editIncome(sendIncome));
        if (setOpen) setOpen(false);
      }
    } else {
      dispatch(addIncome(sendIncome));
    }
    e.currentTarget.reset();
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
        value={incomeSource}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="incomeAmount">Amount of income</InputLabel>
        <OutlinedInput
          label="Amount of income"
          type="number"
          onChange={(e) => setIncomeAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          value={incomeAmount || ""}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        label="Date of income"
        type="date"
        onChange={(e) => setIncomeDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        value={incomeDate}
      />
      <Button
        sx={{ m: 1 }}
        type="submit"
        id="btn_addIncome"
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        color={income ? "success" : "primary"}
      >
        {income ? "Edit income" : "Add income"}
      </Button>
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}
