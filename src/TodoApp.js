import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import "./styles.css";

export default function TodoApp() {
  return (
    <>
      <VisibilityFilters />
      <AddTodo />
      <TodoList />
    </>
  );
}
