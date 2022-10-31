import React, { useEffect, useState } from "react";
import {
  Box,
  OutlinedInput,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

import { pSaving } from "../types/pSaving";

function SaivingsTarget({ saving, setSavingsTarget }: pSaving) {
  const [target, setTarget] = useState<number>(0);
  const [tempTarget, setTempTarget] = useState<number>(0);
  const [procent, setProcent] = useState<number>(0);

  useEffect(
    function () {
      setProcent(target && saving ? (saving / target) * 100 : 0);
    },
    [target, saving, procent]
  );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTarget(tempTarget);
    setTempTarget(0);
    e.currentTarget.reset();
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => submit(e)}
      id="formTarget"
      sx={{ bgcolor: "background.default" }}
    >
      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="setTarget">Set target</InputLabel>
        <OutlinedInput
          label="Set target"
          type="number"
          id="setTarget"
          placeholder="20000"
          //min="0"
          onChange={(e) => setTempTarget(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
        />
      </FormControl>
      <Button
        sx={{ m: 1 }}
        type="submit"
        id="btn_resetTarget"
        variant="contained"
        endIcon={<AdjustIcon />}
      >
        Set target
      </Button>
      <Typography color="textPrimary" className="textCenter">
        Current saving:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(saving)}
        </b>
      </Typography>
      <Typography color="textPrimary" className="textCenter">
        Target:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(target)}
        </b>
      </Typography>
      <Typography color="textPrimary" className="textCenter">
        <label htmlFor="targetProgress">Progress:</label>
        <span> {procent.toFixed(0)}% </span>
        <progress id="targetProgress" value={saving} max={target} />
      </Typography>
    </Box>
  );
}

export default SaivingsTarget;
