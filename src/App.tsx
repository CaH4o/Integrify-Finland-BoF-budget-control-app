import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./styles/App.css";
import Nav from "./components/Nav";
import IncomeSection from "./components/Income";
import ExpenseSection from "./components/Expense";
import SaivingsTargetSection from "./components/SaivingsTarget";
import BalanceSection from "./components/Balance";
import { tIncome } from "./types/tIncome";
import { tExpense } from "./types/tExpense";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [incomes, setIncomes] = useState<tIncome[]>([]);
  const [expenses, setExpenses] = useState<tExpense[]>([]);
  const [savings, setSaivings] = useState<number>(0);
  const [balanceAmount, setBalances] = useState<number>(0);
  const incomeAmountTotal = incomes.reduce(function (prev, curr) {
    return prev + curr.incomeAmount;
  }, 0);
  const expansesAmountTotal = expenses.reduce(function (prev, curr) {
    return prev + curr.expenseAmount;
  }, 0);
  useEffect(
    function () {
      setBalances(incomeAmountTotal - expansesAmountTotal - savings);
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

  return (
    <div className="root">
      <ThemeProvider theme={theme}>
        <Nav mode={mode} setMode={setMode} />
        <div className="main">
          <IncomeSection incomes={incomes} setIncomes={setIncomes} />
          <ExpenseSection
            expenses={expenses}
            setExpenses={setExpenses}
            balanceAmount={balanceAmount}
          />
          <SaivingsTargetSection
            saving={savings}
            setSavingsTarget={setSaivings}
          />
          <BalanceSection
            balance={balanceAmount}
            savings={savings}
            setBalance={setBalances}
            setSaving={setSaivings}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
