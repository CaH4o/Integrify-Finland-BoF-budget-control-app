import { tIncome } from "./tIncome";

export interface tIncomeProp {
    incomes: tIncome[],
    setIncomes: (value: tIncome[])=> void
}