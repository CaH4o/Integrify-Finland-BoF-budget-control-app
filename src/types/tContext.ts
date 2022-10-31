import { tExpense } from "./tExpense";
import { tIncome } from "./tIncome";

export interface tContext {
    toggleMode:() => void,
    incomes: tIncome[],
    expenses: tExpense[],
    savings: number,
    balance: number,
    setIncomes: React.Dispatch<React.SetStateAction<tIncome[]>>,
    setExpenses: React.Dispatch<React.SetStateAction<tExpense[]>>,
    setSaivings: React.Dispatch<React.SetStateAction<number>>,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
}