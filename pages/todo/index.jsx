import Todo from "./Todo";
import { useEffect, useState } from "react";

function App() {
  const [init, setInit] = useState([
    {
      name: "add your first todo",
      checked: false,
    },
  ]);
  const [text, setText] = useState("");
  const handleTextBox = (e) => {
    console.log("text");
    setText(e.target.value);
  };
  const addText = (e) => {
    e.preventDefault();
    if (text !== "") {
      setInit((prevState) => [
        ...prevState,
        {
          name: text,
          checked: false,
        },
      ]);
      setText("");
    }
  };

  const [show, setShow] = useState(true);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addText();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div className="text1">
        <p>TODO LIST</p>
      </div>
      <div>
        <form className="grid">
          <input
            value={text}
            type={"text"}
            className="text"
            onChange={handleTextBox}
            onKeyPress={handleKeypress}
          ></input>
          <button onClick={addText} className="button">
            Add
          </button>
        </form>
      </div>
      {init.map((row, index) => (
        <Todo name={row.name} key={index} checked={row.checked}></Todo>
      ))}
    </div>
  );
}

export default App;
