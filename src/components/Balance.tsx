import React from "react";

function Balance() {
  return (
    <form action="" id="formBalance">
      <p>Current balance: 0</p>
      <div>
        <label htmlFor="transferSavings">Set target</label>
        <input
          type="number"
          name="stransferSavings"
          id="stransferSavings"
          placeholder="200"
          defaultValue="0"
          min="100"
        />
      </div>
      <div>
        <label htmlFor="btn_transferSavings">Transfer to savings accaunt</label>
        <button type="button" id="btn_transferSavings">
          Transfer
        </button>
      </div>
    </form>
  );
}

export default Balance;
