import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlayPage from "./pages/Quickplay";

// Layouts
import MainLayout from "./layouts/MainLayout";
import LobbyPage from "./pages/Lobby";
import SocialPage from "./pages/Social";
import ProfilePage from "./pages/Profile";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
    const user = useSelector((state: RootState) => state.auth.email);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? <Navigate to={"/main/lobby"} /> : <LoginPage />
                    }
                />
                <Route
                    path="/quickplay"
                    element={
                        user ? (
                            <Navigate to={"/main/lobby"} />
                        ) : (
                            <QuickPlayPage />
                        )
                    }
                />

                {/* Authentication required */}
                {user && (
                    <Route path="/main" element={<MainLayout />}>
                        <Route path="lobby" element={<LobbyPage />} />
                        <Route path="social" element={<SocialPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                )}
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </>
    );
}

export default App;
