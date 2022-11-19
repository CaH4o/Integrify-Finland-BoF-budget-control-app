import { tIncome } from "./tIncome";

export interface pIncomeForm {
  income?: tIncome;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
