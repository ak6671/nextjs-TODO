import React, { useState } from "react";
import axios from "axios";

export default function Todo(props) {
  const [checked, setChecked] = useState(props.checked);

  const handlechecked = async (e) => {
    setChecked(e.target.checked);
    const response = await axios.patch("https:/api/list", {
      id: props.id,
      checked: e.target.checked,
      value: props.name,
    });
    console.log("res", response);
  };
  return (
    <>
      <div className="box">
        <input
          className="checkbox"
          type={"checkbox"}
          onClick={handlechecked}
          checked={checked}
        ></input>

        <h3 className={checked == !true ? "nochecked" : "checked"}>
          {props.name}
        </h3>
      </div>
    </>
  );
}
