import Todo from "./Todo";
import { useEffect, useState, CSSProperties, useCallback } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const [init, setInit] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [text, setText] = useState("");
  const result = [...init].sort(
    (a, b) => new Date(b.listaddedTime) - new Date(a.listaddedTime)
  );
  const handleTextBox = (e) => {
    setText(e.target.value);
  };
  const addText = async (e) => {
    e.preventDefault();
    if (text !== "") {
      const listaddedTime = new Date();
      const article = { value: text, checked: false, listaddedTime };

      const { data } = await axios.post(
        "https:/api/list",
        article
      );
      setInit((prevState) => [
        ...prevState,
        {
          _id: data,
          value: text,
          checked: false,
          listaddedTime,
        },
      ]);

      setText("");
    }
  };

  //const [show, setShow] = useState(true);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addText();
    }
  };

  const handleDelete = useCallback(() => {
    setSpinner(true);
    axios.get("https:/api/list").then((response) => {
      //console.log("res", response.data);
      setInit(response.data);
      setSpinner(false);
    });
  }, []);

  const refetch = () => {
    axios.get("https:/api/list").then((response) => {
      setInit(response.data);
      setSpinner(false);
    });
  };

  useEffect(() => {
    refetch();
  }, []);
  console.log("init", init);
  return (
    <div className="App">
      <div className="text1">
        <p>TODO LIST</p>
      </div>
      <div>
        <form className="grid">
          <input
            placeholder="Enter Todo"
            value={text}
            type={"text"}
            className="text"
            onChange={handleTextBox}
            onKeyPress={handleKeypress}
          ></input>
          <button onClick={addText} className="button">
            ADD
          </button>
        </form>
      </div>

      {result.map((row) => (
        <Todo
          name={row.value}
          _id={row._id}
          key={row._id}
          checked={row.checked}
          row={row}
          handleDelete={handleDelete}
          refetch={refetch}
          listaddedTime={row.listaddedTime}
        ></Todo>
      ))}
      <SyncLoader
        color="#36d7b7"
        loading={spinner}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
