export interface IUserData {
    name: string;
    email: string;
    dateJoined: string;
    picture: string;
    provider: string;
    socialId: string;
}

export interface IGameStatisticData {
    ranking: number;
    practicePlayedEasy: number;
    practiceVictoryEasy: number;
    practicePlayedMedium: number;
    practiceVictoryMedium: number;
    practicePlayedHard: number;
    practiceVictoryHard: number;
    onlinePlayed: number;
    onlineVictory: number;
}
