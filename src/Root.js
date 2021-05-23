import React from "react";
import { Provider } from "react-redux";
import TodoApp from "./TodoApp";
import "./styles.css";

function Root({ store }) {
  return (
    <Provider store={store}>
      <div className="root-wrapper">
        <TodoApp />
      </div>
    </Provider>
  );
}

export default Root;
