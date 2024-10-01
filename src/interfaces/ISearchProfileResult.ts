import { IFriendRequestAction } from "./IFriendRequestAction";

export interface ISearchProfileResult {
    name: string;
    picture: string;
    socialId: string;
}

export interface IDetailProfileSearchResult {
    name: string;
    picture: string;
    rank: string;
    isFriend: boolean;
    friendRequestAction: IFriendRequestAction | null;
}
