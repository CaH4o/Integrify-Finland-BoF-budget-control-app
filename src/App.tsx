import React, { useEffect, useState } from "react";

import "./App.css";
import "./styles/App.css";
import IncomeSection from "./components/Income";
import ExpenseSection from "./components/Expense";
import SaivingsTargetSection from "./components/SaivingsTarget";
import BalanceSection from "./components/Balance";
import { tIncome } from "./types/tIncome";
import { tExpense } from "./types/tExpense";

function App() {
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

  return (
    <div className="root">
      <IncomeSection incomes={incomes} setIncomes={setIncomes} />
      <ExpenseSection
        expenses={expenses}
        setExpenses={setExpenses}
        balanceAmount={balanceAmount}
      />
      <SaivingsTargetSection saving={savings} setSavingsTarget={setSaivings} />
      <BalanceSection
        balance={balanceAmount}
        savings={savings}
        setBalance={setBalances}
        setSaving={setSaivings}
      />
    </div>
  );
}

export default App;
