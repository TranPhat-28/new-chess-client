import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from "@microsoft/signalr";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { ISignalRContext } from "../interfaces";

// Default context value - only need for components trying to access context value from outside of the provider
const SignalRContext = createContext<ISignalRContext>({
    mainConnectionHubProvider: null,
});

// Provider
export const SignalRProvider = ({ children }: { children: ReactNode }) => {
    // -------CHANGE FOR DEPLOYMENT----------
    // const baseHubUrl = "http://localhost:5275";
    const baseHubUrl = "https://famous-jacquenette-my-personal-project-c6376a3e.koyeb.app";

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
            connection.start().catch((err) => {
                toast.error(
                    "Cannot establish hub connection. Some data will be unavailable"
                );
                console.log("[MainConnectionHub] ", err);
            });
        }
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

    return (
        <SignalRContext.Provider value={{ mainConnectionHubProvider }}>
            {children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
