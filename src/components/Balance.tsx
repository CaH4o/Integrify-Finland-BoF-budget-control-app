import React, { useState } from "react";
import {
  Box,
  OutlinedInput,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography,
} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";

import { setBalance } from "../redux/reducers/balance";
import { setSaivings } from "../redux/reducers/saivings";
import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

function Balance() {
  const dispatch = useAppDispatch();
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );
  const savings: number = useAppSelector(
    (state: RootState) => state.saivingsReducer
  );
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (transferAmount < 50) {
      setMessage("Error: The amount is incorrect");
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (transferAmount > balance) {
      setMessage("Error: Balance is less then you need");
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    } else {
      dispatch(setBalance(balance - transferAmount))
      dispatch(setSaivings(savings + transferAmount))
    }
    e.currentTarget.reset();
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => submit(e)}
      id="formBalance"
      sx={{ bgcolor: "background.default" }}
    >
      <Typography color="textPrimary" className="textCenter">
        Current balance:{" "}
        <b>
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(balance)}
        </b>
      </Typography>

      <FormControl sx={{ m: 1 }} required>
        <InputLabel htmlFor="transferSavings">
          Transfer to saving accaunt
        </InputLabel>
        <OutlinedInput
          label="Transfer to saving accaunt"
          type="number"
          id="transferSavings"
          placeholder="min 50 €"
          //min="0"
          //max={balance}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
        />
      </FormControl>
      <Button
        sx={{ m: 1 }}
        type="submit"
        id="btn_transferSavings"
        variant="contained"
        endIcon={<SavingsIcon />}
      >
        Transfer
      </Button>
      {message.length > 0 && <span className="error">{message}</span>}
    </Box>
  );
}

export default Balance;
