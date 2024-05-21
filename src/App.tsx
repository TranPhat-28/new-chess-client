import { Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlayPage from "./pages/Quickplay";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main">
                    <Route index element={<div>Lobby</div>} />
                    <Route path="social" element={<div>Social</div>} />
                </Route>
                <Route path="/quickplay" element={<QuickPlayPage />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </>
    );
}

export default App;
