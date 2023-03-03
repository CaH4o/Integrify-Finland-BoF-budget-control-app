import * as yup from "yup";
import { IExpenseForm } from "../types/tExpense";

export const expensesSchema = yup.object({
  expenseSource: yup
    .string()
    .required("It is reqaird field")
    .min(5, "Minimum 5 simbles")
    .max(254, "Maximum 254 simbles")
    .matches(/([A-Z])\w+/g, "First letter should be capital."),
  expenseAmount: yup
    .number()
    .required("It is reqaird field")
    .min(0, "The amount is incorrect")
    .max(9999999, "The amount is incorrect")
    .transform((value) => (isNaN(value) ? undefined : value)),
  expenseDate: yup.string().required("It is reqaird field"),
});
