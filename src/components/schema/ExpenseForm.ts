import * as yup from "yup";

export const expensesSchema = yup.object({
    expenseSource: yup.string().required().min(5).max(254).matches(/([A-Z])\w+/g),
    expenseAmount: yup.number().required().min(0).max(99999), //"The amount is incorrect"
    expenseDate: yup.string().required()
})