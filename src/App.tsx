import { Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlayPage from "./pages/Quickplay";

// Layouts
import MainLayout from "./layouts/MainLayout";
import LobbyPage from "./pages/Lobby";
import SocialPage from "./pages/Social";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main" element={<MainLayout />}>
                    <Route path="lobby" element={<LobbyPage />} />
                    <Route path="social" element={<SocialPage />} />
                </Route>
                <Route path="/quickplay" element={<QuickPlayPage />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </>
    );
}

export default App;
