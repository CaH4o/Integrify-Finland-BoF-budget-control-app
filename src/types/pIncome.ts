import { tIncome } from "./tIncome";

export interface pIncome {
    incomes: tIncome[],
    setIncomes: React.Dispatch<React.SetStateAction<tIncome[]>>
}