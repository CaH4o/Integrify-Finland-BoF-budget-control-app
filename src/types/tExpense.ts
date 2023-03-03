export interface tExpense {
  id: string;
  expenseSource: string;
  expenseAmount: number;
  expenseDate: string;
}

export interface IExpenseForm extends Omit<tExpense, "id"> {}
