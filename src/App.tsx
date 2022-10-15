import React from "react";
import logo from "./logo.svg";
import "./App.css";

import IncomeSection from "./components/Income";
import ExpenseSection from "./components/Expense";
import TargetSection from "./components/Target";
import BalanceSection from "./components/Balance";

function App() {
  return (
    <>
      <IncomeSection />
      <ExpenseSection />
      <TargetSection />
      <BalanceSection />
    </>
  );
}

export default App;
