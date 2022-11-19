import React from "react";
import { Box, Button, Modal } from "@mui/material";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";

import { tExpense } from "../types/tExpense";
import ExpenseForm from "./ExpenseForm";

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
};

export default function ExpenseEdit({ expense }: { expense: tExpense }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        <FlipCameraAndroidIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ExpenseForm />
        </Box>
      </Modal>
    </div>
  );
}
