import React, { useCallback, useState } from "react";
import axios from "axios";
import { arrayStrictEqual } from "mongodb/lib/core/utils";

export default React.memo(function Todo(props) {
  const [checked, setChecked] = useState(props.checked);

  const handlechecked = async (e) => {
    setChecked(e.target.checked);
    const response = await axios.patch("http:/api/list", {
      id: props.id,
      checked: e.target.checked,
      value: props.name,
    });
    console.log("res", response);
  };

  arrayStrictEqual.fo;
  const handleDelete = useCallback(
    async (e) => {
      const response = await axios.post("http:/api/delete", {
        id: props.id,
        checked: e.target.checked,
        value: props.name,
        dbid: props._id,
      });
      props.handleDelete(props.id);
      console.log("res", response);
    },
    [props]
  );

  return (
    <>
      <div className={checked == !true ? "box" : "box true"}>
        <div className="values">
          <input
            className="checkbox"
            type={"checkbox"}
            onClick={handlechecked}
            checked={checked}
          ></input>

          <h3
            className={checked == !true ? "value nochecked" : "value checked"}
          >
            {props.name}
          </h3>
        </div>
        <div className="deleteCTA" onClick={handleDelete}>
          X
        </div>
      </div>
    </>
  );
});
