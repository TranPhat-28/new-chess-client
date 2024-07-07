import { FaSadTear } from "react-icons/fa";
import FriendListItem from "../../components/FriendListItem";

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
    ];

    return (
        <div className="h-full w-full p-2 md:p-4 gap-2 md:gap-4 flex flex-col overflow-hidden max-w-lg md:max-w-xl lg:max-w-5xl self-center justify-center">
            {/* Search input */}
            <label className="input input-bordered flex items-center gap-2 flex-shrink-0">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search a friend"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            {/* The friend list */}
            <div className="bg-gray-300 p-2 rounded-lg w-full flex flex-col flex-grow gap-2 overflow-y-scroll lg:max-h-[60rem]">
                {/* Display the list of friends */}
                {friendList.length > 0 &&
                    friendList.map((friend) => (
                        <FriendListItem key={friend.id} data={friend} />
                    ))}

                {/* No friend */}
                {friendList.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-8 pt-6">
                        <FaSadTear size={"8rem"} color={"whitesmoke"} />
                        <p className="text-base-100 font-bold">
                            You have no friend. Go invite some now!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialPage;
