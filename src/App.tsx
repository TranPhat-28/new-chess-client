import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlayPage from "./pages/Quickplay";
import LobbyPage from "./pages/Lobby";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import ShopPage from "./pages/Shop";
import NotificationPage from "./pages/Notification";
import SocialPage from "./pages/Social";
import PracticeModePage from "./pages/PracticeMode";
import PracticeModeLoadingPage from "./pages/PracticeModeLoading";
import MultiplayerRoomSetupPage from "./pages/MultiplayerRoomSetup";
import MultiplayerGamePage from "./pages/MultiplayerGame";

// Layouts
import MainLayout from "./layouts/MainLayout";
import FriendsLayout from "./layouts/FriendsLayout";
import EventsLayout from "./layouts/EventsLayout";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

// Components
import FriendDetail from "./components/FriendDetail";
import FriendDetailsPlaceholder from "./components/FriendDetailsPlaceholder";
import EventDetailsPlaceholder from "./components/EventDetailsPlaceholder";

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
                    <Route path="notification" element={<NotificationPage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="event" element={<EventsLayout />}>
                        <Route index element={<EventDetailsPlaceholder />} />
                        <Route path=":id" element={<div>Event Detail</div>} />
                    </Route>
                    <Route path="friends" element={<FriendsLayout />}>
                        <Route index element={<FriendDetailsPlaceholder />} />
                        <Route path=":id" element={<FriendDetail />} />
                    </Route>
                </Route>

                <Route path="/practice">
                    <Route
                        path="loading"
                        element={<PracticeModeLoadingPage />}
                    />
                    <Route path="game" element={<PracticeModePage />} />
                </Route>

                <Route path="/multiplayer">
                    <Route
                        path="setup"
                        element={<MultiplayerRoomSetupPage />}
                    />
                    <Route path=":id" element={<MultiplayerGamePage />} />
                </Route>

                {/* )} */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
