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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { tExpense } from "../types/tExpense";
import ExpenseTable from "./ExpenseTable";
import ExpenseTotal from "./ExpenseTotal";
import { addExpenses } from "../redux/reducers/expenses";
import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

function Expense() {
  const dispatch = useAppDispatch();
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );
  const [expenseSource, setExpenseSource] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (expenseAmount <= 0) {
      setMessage("The amount is incorrect");
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (balance >= expenseAmount) {
      const expense: tExpense = {
        id: Date.now().toString(),
        expenseSource,
        expenseAmount,
        expenseDate,
      };
      e.currentTarget.reset();
      dispatch(addExpenses(expense))
    } else {
      setMessage("Error: Balance is less then you need");
      setTimeout(function () {
        setMessage("");
      }, 3000);
    }
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => submit(e)}
      id="formExpense"
      sx={{ bgcolor: "background.default" }}
    >
      <TextField
        sx={{ m: 1 }}
        required
        id="expenseSource"
        name="expenseSource"
        label="Expense source"
        placeholder="bill for ..."
        //min="0"
        type="text"
        onChange={(e) => setExpenseSource(e.target.value)}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="expenseAmount">Amount of expense</InputLabel>
        <OutlinedInput
          label="Amount of expense"
          type="number"
          id="expenseAmount"
          onChange={(e) => setExpenseAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        id="expenseDate"
        name="expenseDate"
        label="Date of expense"
        type="date"
        onChange={(e) => setExpenseDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        sx={{ m: 1 }}
        type="submit"
        id="btn_addExpense"
        variant="contained"
        endIcon={<RemoveCircleOutlineIcon />}
      >
        Add expense
      </Button>
      <ExpenseTotal />
      <ExpenseTable />

      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}

export default Expense;
