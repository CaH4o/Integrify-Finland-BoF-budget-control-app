import { tExpense } from "./tExpense";

export interface tExpenseProp {
  expenses: tExpense[];
  setExpenses: (value: tExpense[]) => void;
  incomesTotal: number;
  savings: number;
}
