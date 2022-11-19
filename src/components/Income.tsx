import { Box } from "@mui/material";

import IncomeTable from "./IncomeTable";
import IncomeTotal from "./IncomeTotal";
import IncomeForm from "./IncomeForm";

export default function Income() {
  return (
    <Box className="component" sx={{ bgcolor: "background.default" }}>
      <IncomeForm />
      <IncomeTotal />
      <IncomeTable />
    </Box>
  );
}
