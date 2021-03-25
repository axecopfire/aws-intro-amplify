import React from "react";
import model from "../model/todosModel";
import TodosContext from "../context/TodosContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTodo = () => {
  const [value, setValue] = React.useState("");

  const [todos, setTodos] = React.useContext(TodosContext);

  const addNewTodo = async () => {
    if (value.length) {
      const res = await model({ type: "ADD_TODO", todo: value });
      setTodos([...todos, res]);
      return setValue("");
    }
  };
  return (
    <tr>
      <td>
        <input
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </td>
      <td>
        <FontAwesomeIcon
          // disabled={!value.length}
          tabindex="0"
          onClick={addNewTodo}
          className={`icon add ${!value.length ? "disabled" : "enabled"}`}
          icon={faPlus}
        />
        {/* <button onClick={addNewTodo} disabled={!value.length}>
          Add todo
        </button> */}
      </td>
    </tr>
  );
};

export default AddTodo;
