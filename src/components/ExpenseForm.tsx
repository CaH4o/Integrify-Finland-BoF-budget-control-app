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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { tExpense } from "../types/tExpense";
import { pExpenseForm } from "../types/pExpenseForm";
import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { addExpenses, editExpenses } from "../redux/reducers/expenses";
import { ExpensesForm } from "../types/tForm";
import { expensesSchema } from "./schema/ExpenseForm";

export default function ExpenseForm({ expense, setOpen }: pExpenseForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpensesForm>({ resolver: yupResolver(expensesSchema) });
  const dispatch = useAppDispatch();
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );
  const [expenseSource, setExpenseSource] = useState<string>(
    expense ? expense.expenseSource : ""
  );
  const [expenseAmount, setExpenseAmount] = useState<number>(
    expense ? expense.expenseAmount : 0
  );
  const [expenseDate, setExpenseDate] = useState<string>(
    expense ? expense.expenseDate : ""
  );
  const [message, setMessage] = useState<string>("");

  function onSubmit(data: ExpensesForm) {
    const expenseSource: string = data.expenseSource;
    const expenseAmount: number = data.expenseAmount;
    const expenseDate: string = data.expenseDate;

    /*   if (expenseAmount <= 0) {
      setMessage("The amount is incorrect");
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    } */
    if (balance >= expenseAmount) {
      const sendExpense: tExpense = {
        id: expense ? expense.id : Date.now().toString(),
        expenseSource,
        expenseAmount,
        expenseDate,
      };

      if (expense) {
        dispatch(editExpenses(sendExpense));
      } else {
        dispatch(addExpenses(sendExpense));
      }

      reset();
      if (setOpen) setOpen(false);
      
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
      onSubmit={handleSubmit(onSubmit)}
      className="componentForm"
    >
      <TextField
        sx={{ m: 1 }}
        required
        label="Expense source"
        placeholder="bill for ..."
        //min="0"
        type="text"
        //onChange={(e) => setExpenseSource(e.target.value)}
        //value={expenseSource}
        {...register("expenseSource")}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="expenseAmount">Amount of expense</InputLabel>
        <OutlinedInput
          label="Amount of expense"
          type="number"
          //onChange={(e) => setExpenseAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          //value={expenseAmount || ""}
          {...register("expenseAmount")}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        label="Date of expense"
        type="date"
        //onChange={(e) => setExpenseDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        //value={expenseDate}
        {...register("expenseDate")}
      />
      <Button
        sx={{ m: 1 }}
        type="submit"
        variant="contained"
        endIcon={<RemoveCircleOutlineIcon />}
        color={expense ? "success" : "primary"}
      >
        {expense ? "Edit expense" : "Add expense"}
      </Button>

      {errors.expenseSource?.message && (
        <span className="error">{errors.expenseSource.message}</span>
      )}
      {errors.expenseAmount?.message && (
        <span className="error">{errors.expenseAmount.message}</span>
      )}
      {errors.expenseDate?.message && (
        <span className="error">{errors.expenseDate.message}</span>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}
