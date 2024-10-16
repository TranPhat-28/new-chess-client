import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlayPage from "./pages/Quickplay";
import LobbyPage from "./pages/Lobby";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
// import FriendPage from "./pages/Friend";
import EventPage from "./pages/Event";
import ShopPage from "./pages/Shop";
import NotificationPage from "./pages/Notification";

// Layouts
import MainLayout from "./layouts/MainLayout";
import FriendsLayout from "./layouts/FriendsLayout";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import FriendDetail from "./components/FriendDetail";
import SocialPage from "./pages/Social";
import FriendDetailsPlaceholder from "./components/FriendDetailsPlaceholder";

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
                {/* {user && ( */}
                <Route path="/main" element={<MainLayout />}>
                    <Route path="lobby" element={<LobbyPage />} />
                    <Route path="social" element={<SocialPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="event" element={<EventPage />} />
                    <Route path="notification" element={<NotificationPage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="friends" element={<FriendsLayout />}>
                        <Route index element={<FriendDetailsPlaceholder />} />
                        <Route path=":id" element={<FriendDetail />} />
                    </Route>
                </Route>
                {/* )} */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
