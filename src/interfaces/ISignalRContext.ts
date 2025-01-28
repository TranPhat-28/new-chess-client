import { HubConnection } from "@microsoft/signalr";

// The Outer Context containing all hubs
export interface ISignalRContext {
    mainConnectionHubProvider: null | IHubContext & {
        // Main Connection Hub Utilities
        fetchOnlinePlayers: () => Promise<number[] | null>
    };
}

// Generic Hub Context
export interface IHubContext {
    connection: HubConnection | null;
    initializeAndStart: (token: string) => void;
    stopAndDestroy: () => void;
}