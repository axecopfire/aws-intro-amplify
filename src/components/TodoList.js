import React from "react";
import model from "../model/todosModel";
import TodoItem from "./TodoItem";
import TodosContext from "../context/TodosContext";

const TodoList = () => {
  const [todos, setTodos] = React.useContext(TodosContext);
  React.useEffect(() => {
    const getSetTodos = async () => {
      const todos = await model({ type: "GET_TODOS" });
      setTodos(todos);
    };
    getSetTodos();
  }, []); // eslint-disable-line
  console.log("Im a render", todos);
  return (
    <>
      {todos.map((item, i) => (
        <TodoItem
          key={`todo-${i}`}
          i={i}
          todos={todos}
          item={item}
          setTodos={setTodos}
        />
      ))}
    </>
  );
};

export default TodoList;
