import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { tIncome } from "../types/tIncome";
import IncomeForm from "./IncomeForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function IncomeEdit({ income }: { income: tIncome }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={()=>setOpen(true)} color="secondary">
        <FlipCameraAndroidIcon />
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Typography textAlign="center"> Edit the income</Typography>
          <IncomeForm income={income} setOpen={setOpen}/>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            endIcon={<RestartAltIcon />}
            color="error"
            onClick={()=>setOpen(false)}
          >
            Close without changing
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
