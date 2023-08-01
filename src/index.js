import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import './styles/index.css'
import App from "./App"


const app = document.getElementById("app");
const root = createRoot(app);
root.render( <BrowserRouter><App /></BrowserRouter>)