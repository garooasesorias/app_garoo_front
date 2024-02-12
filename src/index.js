import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import axios from 'axios';


const container = document.getElementById("app");
const root = createRoot(container); // Create a root.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
//.....................