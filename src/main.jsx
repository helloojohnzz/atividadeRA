// main.jsx — ponto de entrada da SPA.
// O BrowserRouter envolve o App inteiro: assim, qualquer componente
// lá dentro pode usar Routes, NavLink, useNavigate e useLocation.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
