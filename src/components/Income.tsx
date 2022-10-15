import React from 'react'

function Income() {
  return (
    <form action="" id="formIncome">
      <div>
        <label htmlFor="incomeSource">Income source</label>
        <input
          type="text"
          name="incomeSource"
          id="incomeSource"
          placeholder="Salary"
        />
      </div>
      <div>
        <label htmlFor="incomeAmount">Amount of income</label>
        <input type="number" name="incomeAmount" id="incomeAmount" min="0" />
      </div>
      <div>
        <label htmlFor="incomeDate">Date of income</label>
        <input type="date" name="incomeDate" id="incomeDate" />
      </div>
      <button type="button"  id="btn_addIncome">Add income</button>
    </form>
  );
}

export default Income;
