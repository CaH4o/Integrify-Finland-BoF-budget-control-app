export interface tIncome {
    id: string;
    incomeSource: string;
    incomeAmount: number;
    incomeDate: string;
}

export interface IIncomeForm extends Omit<tIncome, "id"> {}