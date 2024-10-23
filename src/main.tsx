import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import InitialAlert from "./components/InitialAlert/index.tsx";
import Loading from "./components/Loading/index.tsx";
import MoveHistoryModal from "./components/MoveHistoryModal/index.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

// axios.defaults.baseURL = "https://famous-jacquenette-my-personal-project-c6376a3e.koyeb.app/";
axios.defaults.baseURL = "http://localhost:5275/";

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
                    <MoveHistoryModal />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>
);
