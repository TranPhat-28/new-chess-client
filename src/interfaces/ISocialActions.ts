export interface IFriendRequestAction {
    friendRequestId: number;
    isSender: boolean;
    isReceiver: boolean;
}

export interface ISocialActionInternalState {
    isFriend: boolean;
    data: IFriendRequestAction | null;
}
