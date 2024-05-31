import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Router>
          <App />
        </Router>
        <Toaster />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
