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
import { GoogleOAuthProvider } from "@react-oauth/google";
import InitialAlert from "./components/InitialAlert/index.tsx";

axios.defaults.baseURL = "https://new-chess-server.onrender.com";
// axios.defaults.baseURL = "http://localhost:5275/";

axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
                <BrowserRouter>
                    <App />
                    <Loading />
                    <InitialAlert />
                    <ToastContainer />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>
);
