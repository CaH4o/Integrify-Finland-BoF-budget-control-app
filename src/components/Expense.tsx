import { Box } from "@mui/material";

import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import ExpenseTotal from "./ExpenseTotal";

export default function Expense() {
  return (
    <Box className="component" sx={{ bgcolor: "background.default" }}>
      <ExpenseForm />
      <ExpenseTotal />
      <ExpenseTable />
    </Box>
  );
}
