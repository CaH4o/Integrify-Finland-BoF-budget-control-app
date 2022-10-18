import React, { useState } from "react";

import { tBalanceProp } from "../types/tBalanceProp";

function Balance({ balance, savings, setBalance, setSaving }: tBalanceProp) {
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (balance >= transferAmount) {
      setBalance(balance - transferAmount);
      setSaving(savings + transferAmount);
      setTransferAmount(0);
    } else {
      setMessage("Error: Balance is less than you need");
      setTimeout(function () {
        setMessage("");
      }, 3000);
    }
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formBalance">
        <p>
          Current balance: <b>{balance} €</b>
        </p>
        {message.length > 0 && <span className="error">{message}</span>}
        <div>
          <label htmlFor="transferSavings">Transfer to saving accaunt</label>
          <input
            type="number"
            name="transferSavings"
            id="transferSavings"
            placeholder="min 50 €"
            min="50"
            onChange={(e) => setTransferAmount(Number(e.target.value))}
            value={transferAmount}
          />
        </div>
        <div>
          <button type="submit" id="btn_transferSavings">
            Transfer
          </button>
        </div>
      </form>
    </section>
  );
}

export default Balance;
