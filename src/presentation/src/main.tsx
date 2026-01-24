import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "sonner";
import { client } from "./graphql/client.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>,
);
