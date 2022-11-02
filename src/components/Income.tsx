import React, { useState, useContext } from "react";
import {
  Box,
  OutlinedInput,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { ThemeContext } from "../App";
import { tIncome } from "../types/tIncome";

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
        id="incomeSource"
        name="incomeSource"
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
          //min="0"
          onChange={(e) => setIncomeAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
        />
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        required
        id="incomeDate"
        name="incomeDate"
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
      <List id="listIncome">
        {manageData.incomes.length > 0 &&
          manageData.incomes.map((income) => (
            <ListItem key={income.id}>
              <p>
                <strong>Title: {income.incomeSource}</strong>
              </p>
              <p>
                <span>
                  Amount:{" "}
                  {new Intl.NumberFormat("fi", {
                    style: "currency",
                    currency: "EUR",
                  }).format(income.incomeAmount)}
                </span>
              </p>
              <p>
                <em>Date: {income.incomeDate}</em>
              </p>
            </ListItem>
          ))}
      </List>
      {manageData.incomes.length > 0 && (
        <div>
          <hr />
          <span>
            Total:{" "}
            <b>
              {new Intl.NumberFormat("fi", {
                style: "currency",
                currency: "EUR",
              }).format(
                manageData.incomes.reduce((prev, curr) => prev + curr.incomeAmount, 0)
              )}
            </b>
          </span>
        </div>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}

export default Income;
