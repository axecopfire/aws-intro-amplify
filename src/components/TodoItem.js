import React from "react";
import model from "../model/todosModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ i, todos, setTodos }) => {
  const [state, setState] = React.useState("read");
  const [value, setValue] = React.useState(todos[i].description);

  const updateItem = async () => {
    try {
      if (value !== todos[i].description) {
        const result = await model({
          type: "UPDATE_TODO",
          todo: { ...todos[i], description: value },
        });
        const copy = todos;
        copy[i] = result;
        setTodos(copy);
      }
      setState("read");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async () => {
    try {
      await model({
        type: "DELETE_TODO",
        todo: todos[i],
      });
      const copy = [...todos];
      copy.splice(i, 1);
      return setTodos(copy);
    } catch (err) {
      console.error(err);
    }
  };

  const Pencil = () => (
    <FontAwesomeIcon
      onClick={() => setState("edit")}
      className="icon edit"
      icon={faPencilAlt}
      tabindex="0"
    />
  );
  const Save = () => (
    <FontAwesomeIcon
      onClick={() => updateItem()}
      className="icon add"
      icon={faCheck}
      tabindex="0"
    />
  );
  const Delete = () => (
    <FontAwesomeIcon
      onClick={() => deleteItem()}
      className="icon delete"
      icon={faTrashAlt}
      tabindex="0"
    />
  );

  return (
    <tr>
      {state === "read" && (
        <>
          <td>
            <input
              type="text"
              tabindex="0"
              value={todos[i].description}
              disabled
            />
          </td>
          <td>
            <Pencil />
            <Delete />
          </td>
        </>
      )}
      {state === "edit" && (
        <>
          <td>
            <input
              type="text"
              tabindex="0"
              onChange={({ target }) => setValue(target.value)}
              value={value}
            />
          </td>
          <td>
            <Save />
            <Delete />
          </td>
        </>
      )}
    </tr>
  );
};

export default TodoItem;
