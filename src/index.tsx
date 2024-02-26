import ReactDOM from "react-dom/client";
import App from "./App";
import "./core-ui/styles.css";
import "./core-ui/hovers.css";
import "./core-ui/responsive.css";
import "./routes/single-product/single-product.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
