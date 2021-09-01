//Imports needed for this file
import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import App from "../App";
import Post from "./Post";

//Constant Router used for creating 2 routes
const Router = (routerProps: { hello: string }) => {
  //Console logging via props
  useEffect(() => {
    console.log(`${routerProps.hello} Router Component`);
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/posts"
          render={(props) => <App {...props} hello={routerProps.hello} />}
          exact
        />
        <Route
          path="/post/:id"
          render={(props) => <Post {...props} hello={routerProps.hello} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

//exporting for future use in other files
export default Router;
