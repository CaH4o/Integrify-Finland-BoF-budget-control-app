import React from "react";

function Target() {
  return (
    <form action="" id="formTarget">
      <div>
        <label htmlFor="setTarget">Set target</label>
        <input
          type="number"
          name="setTarget"
          id="setTarget"
          placeholder="20000"
          defaultValue="0"
          min="0"
        />
      </div>
      <button type="button" id="btn_resetTarget">
        Reset
      </button>
      <p>Current saving: 0</p>
      <p>Target: 0</p>
      <label htmlFor="targetProgress">Progress:</label>
      <span> 0% </span>
      <progress id="targetProgress" value="0" max="100" />
    </form>
  );
}

export default Target;
