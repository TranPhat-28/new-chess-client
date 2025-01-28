import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from "@microsoft/signalr";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

// Type
type SignalRContextType = {
    hub: HubConnection | null;
    initializeHub: (token: string) => void;
    stopHub: () => void;
    fetchOnlineFriends: () => Promise<string[]>;
};

// Context
const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

// Provider
export const SignalRProvider = ({ children }: { children: ReactNode }) => {
    // The hub
    const [hub, setHub] = useState<HubConnection | null>(null);
    // -------CHANGE FOR DEPLOYMENT----------
    const localHubUrl = "http://localhost:5275";
    // const deployHubUrl =
    // "https://famous-jacquenette-my-personal-project-c6376a3e.koyeb.app";

    const initializeHub = (token: string) => {
        console.log("Hub state ", hub);
        if (!hub) {
            const connection = new HubConnectionBuilder()
                .withUrl(localHubUrl + "/hubs/main", {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .build();

            connection
                .start()
                .then(() => {
                    setHub(connection);
                })
                .catch((err) => {
                    toast.error("Cannot establish hub connection");
                    console.log("Error trying to start hub: ", err);
                });
        }
    };

    const stopHub = () => {
        if (hub?.state === HubConnectionState.Connected) {
            hub.stop()
                .then(() => {
                    // Remove the hub
                    setHub(null);
                })
                .catch((err) => {
                    toast.error("Cannot stop hub connection");
                    console.log("Error trying to stop hub: ", err);
                });
        }
    };

    // Client invoke this method on the server
    const fetchOnlineFriends = async (): Promise<string[]> => {
        if (!hub) {
            throw new Error("Hub connection is lost");
        }

        try {
            const users = await hub.invoke("GetCurrentOnlineFriends");
            return users;
        } catch (err) {
            console.log(err);
            throw new Error("Cannot get hub data");
        }
    };

    return (
        <SignalRContext.Provider
            value={{ hub, initializeHub, stopHub, fetchOnlineFriends }}
        >
            {children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
