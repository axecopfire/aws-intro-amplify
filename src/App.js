import React from "react";
import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

import TodosContext from "./context/TodosContext";
import logo from "./logo.svg";
import "./styles/App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const todos = React.useState([]);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <TodosContext.Provider value={todos}>
        <header>
          <h2>Hello, {user.username}</h2>
          <AmplifySignOut />
        </header>
        <main className="App-main">
          <h1>Todo app on Amplify</h1>
          <table>
            <tbody>
              <TodoList />
              <AddTodo />
            </tbody>
          </table>
        </main>
      </TodosContext.Provider>
    </div>
  ) : (
    <div className="App">
      <AmplifyAuthenticator />
    </div>
  );
};

export default AuthStateApp;
