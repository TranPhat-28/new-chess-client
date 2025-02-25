import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
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
import { SignalRProvider } from "./contexts/SignalRContext.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

// -------CHANGE FOR DEPLOYMENT----------
axios.defaults.baseURL = "https://famous-jacquenette-my-personal-project-c6376a3e.koyeb.app/";
// axios.defaults.baseURL = "http://localhost:5275/";

axios.defaults.headers.post["Content-Type"] = "application/json";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <SignalRProvider>
                <GoogleOAuthProvider
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                    <BrowserRouter>
                        <App />
                        <Loading />
                        <InitialAlert />
                        <ToastContainer pauseOnHover={false} stacked={true} />
                        <MoveHistoryModal />
                    </BrowserRouter>
                </GoogleOAuthProvider>
            </SignalRProvider>
        </QueryClientProvider>
    </Provider>
);
