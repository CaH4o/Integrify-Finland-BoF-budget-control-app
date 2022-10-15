import React from "react";
import "./App.css";

import "./styles/App.css"  
import IncomeSection from "./components/Income";
import ExpenseSection from "./components/Expense";
import TargetSection from "./components/Target";
import BalanceSection from "./components/Balance";

function App() {
  return (
    <div className="root">
      <IncomeSection />
      <ExpenseSection />
      <TargetSection />
      <BalanceSection />
    </div>
  );
}

export default App;
