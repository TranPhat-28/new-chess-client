import { createContext, useState, ReactNode } from "react";
import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from "@microsoft/signalr";

type SignalRContextType = {
    hub: HubConnection | null;
    initializeHub: (token: string) => void;
    stopHub: () => void;
};

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const SignalRProvider = ({ children }: { children: ReactNode }) => {
    const [hub, setHub] = useState<HubConnection | null>(null);

    const initializeHub = (token: string) => {
        if (!hub) {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5275/hubs/main", {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .build();

            setHub(connection);
        }
    };

    const stopHub = () => {
        if (hub?.state === HubConnectionState.Connected) {
            hub.stop().catch((err) =>
                console.log("Error stying to stop hub: ", err)
            );
        }
    };

    return (
        <SignalRContext.Provider value={{ hub, initializeHub, stopHub }}>
            {children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
