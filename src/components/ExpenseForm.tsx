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
  } = useForm<ExpensesForm>({
    defaultValues: {
      expenseAmount: expense ? expense.expenseAmount : 0,
      expenseDate: expense ? expense.expenseDate : "",
      expenseSource: expense ? expense.expenseSource : "",
    },
    resolver: yupResolver(expensesSchema),
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );

  function onSubmit(data: ExpensesForm) {
    const expenseSource: string = data.expenseSource;
    const expenseAmount: number = data.expenseAmount;
    const expenseDate: string = data.expenseDate;
    const editExpenseAmount: number = expense ? expense.expenseAmount : 0;

    if (balance >= expenseAmount - editExpenseAmount) {
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
        type="text"
        {...register("expenseSource")}
        error={errors.expenseSource ? true : false}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="expenseAmount">Amount of expense</InputLabel>
        <OutlinedInput
          label="Amount of expense"
          type="number"
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          {...register("expenseAmount")}
          error={errors.expenseAmount ? true : false}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        label="Date of expense"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("expenseDate")}
        error={errors.expenseDate ? true : false}
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
      <p>
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
      </p>
    </Box>
  );
}
