import React, { useState } from "react";
export default function Todo(props) {
  const [checked, setChecked] = useState(props.checked);

  return (
    <>
      <div className="box">
        <input
          className="checkbox"
          type={"checkbox"}
          onClick={(e) => setChecked(e.target.checked)}
        ></input>

        <h3 className={checked == !true ? "" : "checked"}>{props.name}</h3>
      </div>
    </>
  );
}
