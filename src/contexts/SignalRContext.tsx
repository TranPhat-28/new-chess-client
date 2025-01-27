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

    const initializeHub = (token: string) => {
        if (!hub) {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5275/hubs/main", {
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
            hub.stop().catch((err) => {
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
