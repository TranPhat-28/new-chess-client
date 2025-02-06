import { HubConnection } from "@microsoft/signalr";
import { IOnlineRoomInfo } from "./ILobbyData";

// The Outer Context containing all hubs
export interface ISignalRContext {
    mainConnectionHubProvider: null | IHubContext & {
        // Main Connection Hub Utilities
        fetchOnlinePlayers: () => Promise<number[] | null>
    };
    gameLobbyConnectionHubProvider: null | IHubContext & {
        fetchLobbyList: () => Promise<IOnlineRoomInfo[] | null>,
        createGameRoom: (
            isPublicRoom: boolean,
            roomPassword: string
        ) => Promise<string | null>
    };
}

// Generic Hub Context
export interface IHubContext {
    connection: HubConnection | null;
    initializeAndStart: (token: string) => Promise<void>;
    stopAndDestroy: () => void;
}