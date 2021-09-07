import React from "react";
import { Route } from "react-router-dom";
import Adminpanel from "./components/Adminpanel";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Route exact path="/">
        <Login />
      </Route>

      <Route path="/adminpanel">
        <Adminpanel />
      </Route>
    </>
  );
};

export default App;
