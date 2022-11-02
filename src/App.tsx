import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import "./styles/App.css";
import Nav from "./components/Nav";
import IncomeSection from "./components/Income";
import ExpenseSection from "./components/Expense";
import SaivingsTargetSection from "./components/SaivingsTarget";
import BalanceSection from "./components/Balance";
import { tIncome } from "./types/tIncome";
import { tExpense } from "./types/tExpense";
import { tContext } from "./types/tContext";

export const ThemeContext = createContext<tContext>({
  toggleMode: () => {},
  incomes: [],
  expenses: [],
  savings: 0,
  balance: 0,
  setIncomes: () => {},
  setExpenses: () => {},
  setSaivings: () => {},
  setBalance: () => {},
});

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [incomes, setIncomes] = useState<tIncome[]>([]);
  const [expenses, setExpenses] = useState<tExpense[]>([]);
  const [savings, setSaivings] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const incomeAmountTotal = incomes.reduce(function (prev, curr) {
    return prev + curr.incomeAmount;
  }, 0);
  const expansesAmountTotal = expenses.reduce(function (prev, curr) {
    return prev + curr.expenseAmount;
  }, 0);
  useEffect(
    function () {
      setBalance(incomeAmountTotal - expansesAmountTotal - savings);
    },
    [incomes, expenses, savings, expansesAmountTotal, incomeAmountTotal]
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#F8EDE3" },
            secondary: { main: "#D0B8A8" },
            divider: "#DFD3C3",
            text: {
              primary: "#7D6E83",
              secondary: "#7D6E83",
            },
            background: { default: "#fff" },
          }
        : {
            primary: { main: "#3F3B6C" },
            secondary: { main: "#9F73AB" },
            divider: "#624F82",
            text: {
              primary: "#A3C7D6",
              secondary: "#A3C7D6",
            },
            background: { default: "#000" },
          }),
    },
  });

  const manageTheme = {
    toggleMode: function () {
      setMode((mode) => (mode === "light" ? "dark" : "light"));
    },
    incomes,
    expenses,
    savings,
    balance,
    setIncomes,
    setExpenses,
    setSaivings,
    setBalance,
  };

  return (
    <div className="root">
      <ThemeContext.Provider value={manageTheme}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={0.5} justifyContent="center" alignItems="start">
            <Grid item xs={12}>
              <Nav />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IncomeSection />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ExpenseSection />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SaivingsTargetSection />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BalanceSection />
            </Grid>
          </Grid>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
