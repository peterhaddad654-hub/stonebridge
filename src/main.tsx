import { createRoot } from "react-dom/client";
import App from "./App";
import { ProductsProvider } from "@/context/ProductsContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
);
