export interface IOnlineRoomInfo {
    id: string;
    host: IRoomPlayer;
    player: IRoomPlayer | null;
    isPrivate: boolean;
    isPlaying: boolean;
    isGameOver: boolean;
}

export interface IRoomPlayer {
    id: number;
    name: string;
    socialId: string;
    picture: string;
}
