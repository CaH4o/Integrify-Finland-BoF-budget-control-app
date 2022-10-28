import React, { useState } from "react";

import { tIncomeProp } from "../types/tIncomeProp";
import { tIncome } from "../types/tIncome";

function Income({ incomes, setIncomes }: tIncomeProp) {
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [incomeDate, setIncomeDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!incomeSource) {
      setMessage('Error: The field "Source" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (!incomeAmount) {
      setMessage('Error: The field "Amount" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (!incomeDate) {
      setMessage('Error: The field "Date" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    const income: tIncome = {
      id: Date.now().toString(),
      incomeSource,
      incomeAmount,
      incomeDate,
    };
    e.currentTarget.reset();
    setIncomeSource("");
    setIncomeAmount(0);
    setIncomeDate("");
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
            value={incomeSource}
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
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(Number(e.target.value))}
            onFocus={(e) => (e.target.value === "0" && (e.target.value = ""))}
          />
        </div>
        <div>
          <label htmlFor="incomeDate">Date of income</label>
          <input
            type="date"
            name="incomeDate"
            id="incomeDate"
            value={incomeDate}
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
                <span>
                  Amount:{" "}
                  {new Intl.NumberFormat("fi", {
                    style: "currency",
                    currency: "EUR",
                  }).format(income.incomeAmount)}
                </span>
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
            <b>
              {new Intl.NumberFormat("fi", {
                style: "currency",
                currency: "EUR",
              }).format(
                incomes.reduce((prev, curr) => prev + curr.incomeAmount, 0)
              )}
            </b>
          </span>
        </div>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </section>
  );
}

export default Income;
