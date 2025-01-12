import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import RouterList from "./router/RouterList.jsx";
import { Provider } from "react-redux";
import Store from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={Store}>
            <RouterProvider router={RouterList} />
        </Provider>
    </StrictMode>
);
