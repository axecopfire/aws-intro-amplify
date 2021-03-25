import React from "react";
import { API, Auth } from "aws-amplify";

/* Next, import the createContact mutation */
import { createTodo, updateTodo, deleteTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";

/* Create a function that will create a new contact */
async function createNewTodo(user, description) {
  const res = await API.graphql({
    query: createTodo,
    variables: {
      input: {
        name: user.username,
        description,
      },
    },
  });
  return res.data.createTodo;
}

async function getUserTodos(user) {
  const res = await API.graphql({
    query: listTodos,
    filter: {
      name: {
        eq: user.username,
      },
    },
  });
  return res.data.listTodos.items;
}

async function updateTodoData(todo) {
  const res = await API.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: todo.id,
        description: todo.description,
      },
    },
  });
  return res.data.updateTodo;
}

async function removeTodo(todo) {
  const res = await API.graphql({
    query: deleteTodo,
    variables: {
      input: {
        id: todo.id,
      },
    },
  });
  return res.data.deleteTodo;
}

const modelInterface = async (action) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    switch (action.type) {
      case "GET_TODOS":
        return getUserTodos(user);
      case "ADD_TODO":
        return createNewTodo(user, action.todo);
      case "UPDATE_TODO":
        return updateTodoData(action.todo);
      case "DELETE_TODO":
        return removeTodo(action.todo);
      default:
        return;
    }
  } catch (err) {
    console.error(err);
  }
};

export default modelInterface;
