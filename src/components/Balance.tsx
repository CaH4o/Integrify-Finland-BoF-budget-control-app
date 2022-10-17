import React, { useState } from "react";

import { tBalanceProp } from "../types/tBalanceProp";

function Balance({ balance, savings, setBalance, setSaving }: tBalanceProp) {
  const [transferAmount, setTransferAmount] = useState(0);
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (balance >= transferAmount) {
      setBalance(balance - transferAmount)
      setSaving(savings + transferAmount)
      setMessage("");
    } else {
      setMessage("Error: Balance is less than you want saving");
    }
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formBalance">
        <p>Current balance: <b>{balance}</b></p>
        {message.length > 0 && <span className="error">{message}</span>}
        <div>
          <label htmlFor="transferSavings">Set target</label>
          <input
            type="number"
            name="stransferSavings"
            id="stransferSavings"
            placeholder="200"
            defaultValue="0"
            min="100"
            onChange={(e) => setTransferAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="btn_transferSavings">
            Transfer to savings accaunt
          </label>
          <button type="submit" id="btn_transferSavings">
            Transfer
          </button>
        </div>
      </form>
    </section>
  );
}

export default Balance;
