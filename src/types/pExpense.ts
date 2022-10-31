import { tExpense } from "./tExpense";

export interface pExpense {
  expenses: tExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<tExpense[]>> ;
  balanceAmount: number;
}
