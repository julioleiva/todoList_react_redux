import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions";
import "../styles.css";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleClick = () => {
    if (input) {
      dispatch(addTodo(input));
      setValidationMessage("");
      setInput("");
    } else {
      setValidationMessage("Valor requerido");
    }
  };
  return (
    <div>
      <input
        type="text"
        aria-label="Enter todo"
        onChange={handleChange}
        value={input}
      />
      {validationMessage ? (
        <span className="validation-message">{validationMessage}</span>
      ) : null}
      <p className="add-todo" onClick={handleClick}>
        Add Todo
      </p>
    </div>
  );
};

export default AddTodo;
