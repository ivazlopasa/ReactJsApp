//Imports needed for this file
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./components/Router";
import "bootstrap/dist/css/bootstrap.min.css";

const hello = "Hello From";

//rendering Router instead of App to use paths in Router file
ReactDOM.render(<Router hello={hello} />, document.getElementById("root"));
