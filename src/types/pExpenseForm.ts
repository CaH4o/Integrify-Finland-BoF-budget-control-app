import { tExpense } from "./tExpense";

export interface pExpenseForm {
  expense?: tExpense;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
