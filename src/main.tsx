import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading/index.tsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = "https://noob-chess-server.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Loading />
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
