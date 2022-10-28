import { tIncome } from "./tIncome";

export interface tIncomeProp {
    incomes: tIncome[],
    setIncomes: React.Dispatch<React.SetStateAction<tIncome[]>>
}