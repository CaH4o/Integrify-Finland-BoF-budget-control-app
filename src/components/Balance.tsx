import React, { useState } from "react";

import { tBalanceProp } from "../types/tBalanceProp";

function Balance({ balance, savings, setBalance, setSaving }: tBalanceProp) {
  const [transferAmount, setTransferAmount] = useState<number>(0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBalance(balance - transferAmount);
    setSaving(savings + transferAmount);
    setTransferAmount(0);
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formBalance">
        <p>
          Current balance:{" "}
          <b>
            {new Intl.NumberFormat("fi", {
              style: "currency",
              currency: "EUR",
            }).format(balance)}
          </b>
        </p>
        <div>
          <label htmlFor="transferSavings">Transfer to saving accaunt</label>
          <input
            type="number"
            name="transferSavings"
            id="transferSavings"
            placeholder="min 50 €"
            min="50"
            max={balance}
            value={transferAmount.toString().replace(/^0+/,"")}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
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
