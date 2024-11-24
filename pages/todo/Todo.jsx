import React, { useCallback, useState } from "react";
import axios from "axios";

export default React.memo(function Todo(props) {
  const [checked, setChecked] = useState(props.checked);

  const handlechecked = async (e) => {
    setChecked(e.target.checked);
    const response = await axios.patch("https:/api/list", {
      _id: props._id,
      checked: e.target.checked,
      value: props.name,
      listaddedTime: props.listaddedTime,
    });
    console.log("res", response);
    props.refetch();
  };

  const handleDelete = useCallback(
    async (e) => {
      const response = await axios.post("https:/api/delete", {
        _id: props._id,
        checked: e.target.checked,
        value: props.name,
        listaddedTime: props.listaddedTime,
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
