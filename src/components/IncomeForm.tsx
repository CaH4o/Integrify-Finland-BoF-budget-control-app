import React, { useState } from "react"
import {
  Box,
  OutlinedInput,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Typography,
} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { RootState } from "../redux/store"
import { IIncomeForm, tIncome } from "../types/tIncome"
import { pIncomeForm } from "../types/pIncomeForm"
import { addIncome, editIncome } from "../redux/reducers/incomes"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { incomesSchema } from "../schema/IncomeForm"

export default function IncomeForm({ income, setOpen }: pIncomeForm) {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState<string>("")
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IIncomeForm>({
    defaultValues: {
      incomeSource: income ? income.incomeSource : "",
      incomeAmount: income ? income.incomeAmount : 0,
      incomeDate: income ? income.incomeDate : "",
    },
    resolver: yupResolver(incomesSchema),
  })

  function onSubmit(data: IIncomeForm) {
    const incomeSource: string = data.incomeSource
    const incomeAmount: number = data.incomeAmount
    const incomeDate: string = data.incomeDate
    const id: string = income ? income.id : Date.now().toString()
    const sendIncome: tIncome = { id, incomeSource, incomeAmount, incomeDate }

    if (income) {
      if (balance >= income.incomeAmount - incomeAmount) {
        dispatch(editIncome(sendIncome))
        reset()
        if (setOpen) setOpen(false)
      } else {
        setMessage("Error: The amount is less then balance")
        setTimeout(function () {
          setMessage("")
        }, 3000)
        return
      }
    } else {
      dispatch(addIncome(sendIncome))
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
        label="Income source"
        placeholder="Salary"
        type="text"
        {...register("incomeSource")}
        error={errors.incomeSource ? true : false}
      />
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="incomeAmount">Amount of income</InputLabel>
        <OutlinedInput
          label="Amount of income"
          type="number"
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          {
            ...register("incomeAmount") /* ,
          { max: balance - (income ? income.incomeAmount : 0) } */
          }
          error={errors.incomeAmount ? true : false}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        label="Date of income"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("incomeDate")}
        error={errors.incomeDate ? true : false}
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
      <Typography color="textPrimary" sx={{ textAlign: "center" }}>
        {errors.incomeSource?.message && (
          <span className="error">{errors.incomeSource.message}</span>
        )}
        {errors.incomeAmount?.message && (
          <span className="error">{errors.incomeAmount.message}</span>
        )}
        {errors.incomeDate?.message && (
          <span className="error">{errors.incomeDate.message}</span>
        )}
        {message.length > 0 && <span className="error">{message}</span>}
      </Typography>
    </Box>
  )
}
