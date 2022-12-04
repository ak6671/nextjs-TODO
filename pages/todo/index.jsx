import Todo from "./Todo";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [init, setInit] = useState([]);
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
      const response = await axios.post("https:/api/list", article);
    }
  };

  //const [show, setShow] = useState(true);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addText();
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setShow(false);
    // }, 1000);
    axios.get("https:/api/list").then((response) => {
      //console.log("res", response.data);
      setInit(response.data);
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
        ></Todo>
      ))}
    </div>
  );
}

export default App;
