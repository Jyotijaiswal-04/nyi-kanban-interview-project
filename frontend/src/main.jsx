import { createRoot } from "react-dom/client";
import { DndContext } from "@dnd-kit/core";

import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./static/css/index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DndContext>
      <App />
    </DndContext>
  </AuthProvider>
);
