import React, { useEffect, useState } from "react";

import { tSavingProp } from "../types/tSavingProp";

function SaivingsTarget({ saving, setSavingsTarget }: tSavingProp) {
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
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formTarget">
        <div>
          <label htmlFor="setTarget">Set target</label>
          <input
            type="number"
            name="setTarget"
            id="setTarget"
            placeholder="20000 €"
            min="0"
            onChange={(e) => setTempTarget(Number(e.target.value))}
          />
        </div>
        <button type="submit" id="btn_resetTarget">
          Reset
        </button>
        <p>Current saving: <b>{saving} €</b></p>
        <p>Target: <b>{target} €</b></p>
        <label htmlFor="targetProgress">Progress:</label>
        <span> {procent.toFixed(0)}% </span>
        <progress id="targetProgress" value={saving} max={target} />
      </form>
    </section>
  );
}

export default SaivingsTarget;
