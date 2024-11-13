import { IFriendRequestAction } from "./ISocialActions";

export interface ISearchProfileResult {
    name: string;
    picture: string;
    socialId: string;
}

export interface IDetailProfileSearchResult {
    id: number;
    name: string;
    picture: string;
    rank: string;
    isFriend: boolean;
    friendRequestAction: IFriendRequestAction | null;
}
