import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FeedbackProvider } from "./provider/FeedbackProvider";
import { QueryProvider } from "./provider/QueryProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <FeedbackProvider>
          <App />
        </FeedbackProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  </StrictMode>,
);
