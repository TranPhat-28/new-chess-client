export interface IFriendOutletContext {
    navigateId: number;
    setNavigateId: React.Dispatch<React.SetStateAction<number>>;
    onlineFriends: number[] | null;
}
