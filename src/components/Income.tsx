import React, { useState } from "react";

import { tIncomeProp } from "../types/tIncomeProp";
import { tIncome } from "../types/tIncome";

function Income({ incomes, setIncomes }: tIncomeProp) {
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [incomeDate, setIncomeDate] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!incomeSource) {
      setMessage('Error: The field "Sourse" is empty');
      return;
    }
    if (!incomeAmount) {
      setMessage('Error: The field "Amount" is empty');
      return;
    }
    if (!incomeDate) {
      setMessage('Error: The field "Date" is empty');
      return;
    }
    const income: tIncome = {
      id: Date.now().toString(),
      incomeSource,
      incomeAmount,
      incomeDate,
    };
    message.length > 0 && setMessage("");
    setIncomes([income, ...incomes]);
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formIncome">
        <div>
          <label htmlFor="incomeSource">Income source</label>
          <input
            type="text"
            name="incomeSource"
            id="incomeSource"
            placeholder="Salary"
            onChange={(e) => setIncomeSource(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="incomeAmount">Amount of income</label>
          <input
            type="number"
            name="incomeAmount"
            id="incomeAmount"
            min="0"
            onChange={(e) => setIncomeAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="incomeDate">Date of income</label>
          <input
            type="date"
            name="incomeDate"
            id="incomeDate"
            onChange={(e) => setIncomeDate(e.target.value)}
          />
        </div>
        <button type="submit" id="btn_addIncome">
          Add income
        </button>
      </form>
      <ul id="listIncome">
        {incomes.length > 0 &&
          incomes.map((income) => (
            <li key={income.id}>
              <p>
                <strong>Title: {income.incomeSource}</strong>
              </p>
              <p>
                <span>Amount: {income.incomeAmount}</span>
              </p>
              <p>
                <em>Date: {income.incomeDate}</em>
              </p>
            </li>
          ))}
      </ul>
      {incomes.length > 0 && (
        <div>
          <hr />
          <span>
            Total:{" "}
            <b>{incomes.reduce((prev, curr) => prev + curr.incomeAmount, 0)}</b>
          </span>
        </div>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </section>
  );
}

export default Income;
