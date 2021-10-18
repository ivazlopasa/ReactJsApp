//Imports needed for this file
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const hello = "Hello From";
const queryClient = new QueryClient();

//rendering Router instead of App to use paths in Router file
ReactDOM.render(
<QueryClientProvider client={queryClient}>
<App hello={hello} />
</QueryClientProvider>, document.getElementById("root"));
