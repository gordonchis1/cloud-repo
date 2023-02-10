import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
//import { Header, Content, Total } from "./Course";

const root = createRoot(document.getElementById("root"), []);

root.render(<App />);
