import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

// biome-ignore lint/style/noNonNullAssertion: React root
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
