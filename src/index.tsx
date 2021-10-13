//Imports needed for this file
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const hello = "Hello From";

//rendering Router instead of App to use paths in Router file
ReactDOM.render(<App hello={hello} />, document.getElementById("root"));
