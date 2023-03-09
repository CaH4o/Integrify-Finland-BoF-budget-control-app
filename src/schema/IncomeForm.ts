import * as yup from "yup";
import { IIncomeForm } from "../types/tIncome";

export const incomesSchema = yup.object({
  incomeSource: yup
    .string()
    .required("It is reqaird field")
    .matches(/([A-Z])\w+/g, "First letter should be capital.")
    .min(5, "Minimum 5 simbles")
    .max(254, "Maximum 254 simbles"),
  incomeAmount: yup
    .number()
    .required("It is reqaird field")
    .min(0, "The amount is incorrect")
    .max(9999999, "The amount is incorrect")
    .transform((value) => (isNaN(value) ? undefined : value)),
  incomeDate: yup.string().required("It is reqaird field"),
});
