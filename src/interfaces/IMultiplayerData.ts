export interface IPlayerInfoCardData {
    id: number;
    name: string;
    picture: string;
    socialId: string;
}

export interface IRoomInfoResponse {
    isSuccess: boolean;
    message: string;
    data: {
        id: string;
        host: {
            id: number;
            name: string;
            picture: string;
            socialId: string;
        };
        player: {
            id: number;
            name: string;
            picture: string;
            socialId: string;
        } | null;
        isPrivate: boolean;
        isPlaying: boolean;
    } | null;
}

export interface IPlayerMove {
    roomid: string;
    move: string;
    playerid: string;
}

export interface IGameUpdateData {
    id: string;
    hostId: number;
    playerId: number;
    movingPlayerId: number;
    history: string[];
    isHostChecked: boolean;
    isPlayerChecked: boolean;
}
