import { FaSadTear } from "react-icons/fa";
import FriendListItem from "../../components/FriendListItem";
import SearchResultItem from "../../components/SearchResultItem";
import { useState } from "react";

const SocialPage = () => {
    // Dummy data
    interface IDummyFriend {
        name: string;
        id: number;
    }

    const friendList: IDummyFriend[] = [
        { name: "John", id: 1 },
        { name: "Kate", id: 2 },
        { name: "Pete", id: 3 },
        { name: "John", id: 4 },
        { name: "Kate", id: 5 },
        { name: "Pete", id: 6 },
        { name: "John", id: 7 },
        { name: "Kate", id: 8 },
        { name: "Pete", id: 9 },
        { name: "John", id: 10 },
        { name: "Kate", id: 11 },
        { name: "Pete", id: 12 },
        { name: "John", id: 13 },
        { name: "Kate", id: 14 },
        { name: "Pete", id: 15 },
    ];

    // Dummy state for searching
    const [search, setSearch] = useState<string>("");

    const searchHandler = (input: string) => {
        setSearch(input);
    };

    return (
        <div className="h-full w-full p-2 md:p-4 gap-2 md:gap-4 flex flex-col max-w-lg md:max-w-xl lg:max-w-5xl self-center justify-center overflow-hidden">
            {/* Search container */}
            <div className="w-full bg-base-300 p-2 md:p-4 rounded-lg flex flex-col gap-2">
                <p className="font-bold text-2xl">Search a friend</p>

                <input
                    type="text"
                    placeholder="Friend social id here"
                    className="input input-bordered w-full"
                    onChange={(e) => searchHandler(e.target.value)}
                    value={search}
                />

                {/* Result will be shown here */}
                {search !== "" && <SearchResultItem result={search} />}
            </div>

            {/* The friend list */}
            <div className="w-full bg-base-300 p-2 md:p-4 rounded-lg flex-1 lg:max-h-[52rem] flex flex-col gap-2 overflow-hidden">
                <p className="font-bold text-2xl">Your friends</p>

                <div className="bg-gray-300 p-2 rounded-lg w-full h-full flex flex-col gap-2 overflow-y-scroll">
                    {friendList.length > 0 &&
                        friendList.map((friend) => (
                            <FriendListItem key={friend.id} data={friend} />
                        ))}
                </div>
            </div>
            {/* <div className="bg-base-300 p-4 rounded-lg w-full flex flex-col flex-grow gap-2 overflow-y-scroll lg:max-h-[60rem]">
                <p className="font-bold text-2xl sticky top-0 -translate-y-2 z-10 bg-base-300">Your Friends</p>
                
                {friendList.length > 0 &&
                    friendList.map((friend) => (
                        <FriendListItem key={friend.id} data={friend} />
                    ))}

                
                {friendList.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-8 pt-6">
                        <FaSadTear size={"8rem"} color={"whitesmoke"} />
                        <p className="text-base-100 font-bold">
                            You have no friend. Go invite some now!
                        </p>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default SocialPage;
