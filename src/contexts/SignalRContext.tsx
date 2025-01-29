import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from "@microsoft/signalr";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { IOnlineRoomInfo, ISignalRContext } from "../interfaces";

// Default context value - only need for components trying to access context value from outside of the provider
const SignalRContext = createContext<ISignalRContext>({
    mainConnectionHubProvider: null,
    gameLobbyConnectionHubProvider: null,
});

// Provider
export const SignalRProvider = ({ children }: { children: ReactNode }) => {
    // -------CHANGE FOR DEPLOYMENT----------
    const baseHubUrl = "http://localhost:5275";
    // const baseHubUrl =
        // "https://famous-jacquenette-my-personal-project-c6376a3e.koyeb.app";

    // -------- MAIN CONNECTION HUB --------
    const [mainHubConnection, setMainHubConnection] =
        useState<HubConnection | null>(null);

    const initializeAndStartMainHub = (token: string) => {
        if (!mainHubConnection) {
            // Hub builder
            const connection = new HubConnectionBuilder()
                .withUrl(baseHubUrl + "/hubs/main", {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .build();

            // Set new hub
            setMainHubConnection(connection);

            // Start hub
            return connection.start().catch((err) => {
                toast.error(
                    "Cannot establish hub connection. Some data will be unavailable"
                );
                console.log("[MainConnectionHub] ", err);
            });
        }

        return Promise.reject();
    };

    const stopAndDestroyMainHub = () => {
        if (mainHubConnection?.state === HubConnectionState.Connected) {
            mainHubConnection
                .stop()
                .then(() => {
                    setMainHubConnection(null);
                })
                .catch((err) => {
                    toast.error("Cannot terminate hub connection");
                    console.log("[MainConnectionHub] ", err);
                });
        }
    };

    // Null means connection is lost
    const fetchOnlinePlayers = async (): Promise<number[] | null> => {
        if (!mainHubConnection) {
            toast.error("Hub connection is lost");
            console.log("[MainConnectionHub] Connection is lost");
            return null;
        } else {
            try {
                const users = await mainHubConnection.invoke(
                    "GetCurrentOnlineFriends"
                );
                return users;
            } catch (err) {
                toast.error("Cannot get live hub data");
                console.log(
                    "[MainConnectionHub] Cannot invoke server hub method"
                );
                return null;
            }
        }
    };

    const mainConnectionHubProvider = {
        connection: mainHubConnection,
        initializeAndStart: initializeAndStartMainHub,
        stopAndDestroy: stopAndDestroyMainHub,
        fetchOnlinePlayers: fetchOnlinePlayers,
    };

    // -------- GAME LOBBY HUB --------
    const [gameLobbyHubConnection, setGameLobbyHubConnection] =
        useState<HubConnection | null>(null);

    const initializeAndStartGameLobbyHub = (token: string) => {
        if (!gameLobbyHubConnection) {
            // Hub builder
            const connection = new HubConnectionBuilder()
                .withUrl(baseHubUrl + "/hubs/lobby", {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .build();

            // Set new hub
            setGameLobbyHubConnection(connection);

            // Start hub
            return connection.start().catch((err) => {
                toast.error(
                    "Cannot establish hub connection. Some data will be unavailable"
                );
                console.log("[GameLobbyHub] ", err);
            });
        }

        return Promise.reject();
    };

    const stopAndDestroyGameLobbyHub = () => {
        if (gameLobbyHubConnection?.state === HubConnectionState.Connected) {
            gameLobbyHubConnection
                .stop()
                .then(() => {
                    setGameLobbyHubConnection(null);
                })
                .catch((err) => {
                    toast.error("Cannot terminate hub connection");
                    console.log("[GameLobbyHub] ", err);
                });
        }
    };

    // Null means connection is lost
    const fetchLobbyList = async (): Promise<IOnlineRoomInfo[] | null> => {
        if (!gameLobbyHubConnection) {
            toast.error("Hub connection is lost");
            console.log("[GameLobbyHub] Connection is lost");
            return null;
        } else {
            try {
                console.log("Invoke: ", gameLobbyHubConnection.state)
                const roomsList = await gameLobbyHubConnection.invoke(
                    "GetCurrentLobbyGameList"
                );
                return roomsList;
            } catch (err) {
                toast.error("Cannot get live hub data");
                console.log("[GameLobbyHub] Cannot invoke server hub method");
                console.log(err);
                return null;
            }
        }
    };

    const gameLobbyConnectionHubProvider = {
        connection: gameLobbyHubConnection,
        initializeAndStart: initializeAndStartGameLobbyHub,
        stopAndDestroy: stopAndDestroyGameLobbyHub,
        fetchLobbyList: fetchLobbyList,
    };

    return (
        <SignalRContext.Provider
            value={{
                mainConnectionHubProvider,
                gameLobbyConnectionHubProvider,
            }}
        >
            {children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
