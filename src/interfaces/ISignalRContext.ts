import { HubConnection } from "@microsoft/signalr";
import { IOnlineRoomInfo } from "./ILobbyData";

// The Outer Context containing all hubs
export interface ISignalRContext {
    mainConnectionHubProvider: null | IHubContext & {
        // Main Connection Hub Utilities
        fetchOnlinePlayers: () => Promise<number[] | null>
    };
    gameLobbyConnectionHubProvider: null | IHubContext & {
        fetchLobbyList: () => Promise<IOnlineRoomInfo[] | null>
    };
    multiplayerRoomConnectionHubProvider: null | IRoomConnectionHubContext
}

// Generic Hub Context
export interface IHubContext {
    connection: HubConnection | null;
    initializeAndStart: (token: string) => Promise<void>;
    stopAndDestroy: () => void;
}

// Multiplayer Room Hub Context
export interface IRoomConnectionHubContext {
    connection: HubConnection | null;
    initializeAndStart: (token: string, roomId: string) => Promise<HubConnection>;
    stopAndDestroy: () => void;
}