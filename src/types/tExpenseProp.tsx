import { tExpense } from "./tExpense";

export interface tExpenseProp {
  expenses: tExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<tExpense[]>> ;
  balanceAmount: number;
}
