import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors";

const TodoList = () => {
  const visbilityFilter = useSelector((state) => state.visibilityFilter);
  const todos = useSelector((state) =>
    getTodosByVisibilityFilter(state, visbilityFilter)
  );

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />;
          })
        : "Nada por aquí!"}
    </ul>
  );
};

export default TodoList;
