import Todo from "./Todo";
import { useEffect, useState,CSSProperties } from "react";
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
  const handleTextBox = (e) => {
    setText(e.target.value);
  };
  const addText = async (e) => {
    e.preventDefault();
    if (text !== "") {
      const article = { value: text, checked: false, id: init.length + 1 };
      setInit((prevState) => [
        ...prevState,
        {
          id: init.length + 1,
          value: text,
          checked: false,
        },
      ]);
      setText("");
      const response = await axios.post("https:/api/list1", article);
    }
  };

  //const [show, setShow] = useState(true);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addText();
    }
  };

  const handleDelete = () => {
    setSpinner(true)
    axios.get("https:/api/list").then((response) => {
      //console.log("res", response.data);
      setInit(response.data);
      setSpinner(false)
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setShow(false);
    // }, 1000);
    axios.get("https:/api/list").then((response) => {
      //console.log("res", response.data);
      setInit(response.data);
      setSpinner(false)
    });
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

      {init.map((row, index) => (
        <Todo
          name={row.value}
          id={row.id}
          key={index}
          checked={row.checked}
          row={row}
          handleDelete={handleDelete}
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
