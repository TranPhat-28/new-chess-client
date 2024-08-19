import { IoSend } from "react-icons/io5";
import { HashLoader } from "react-spinners";
import ChatItem from "../../components/ChatItem";

const FriendPage = () => {
    const userData = {
        picture: "https://picsum.photos/200",
        rank: "1860",
        name: "Dummy",
        dateJoined: "1/1/2001",
        email: "dummy@gmail.com",
    };

    return (
        <div className="h-full w-full p-4 md:p-6 gap-4 md:gap-6 flex flex-col lg:flex-row overflow-hidden max-w-lg md:max-w-xl lg:max-w-[78rem] self-center justify-center">
            {/* Profile container */}
            <div className="bg-base-100 rounded-lg shadow-lg p-4 flex flex-col items-center lg:flex-1 lg:max-w-lg lg:max-h-[60rem] lg:h-full lg:self-center lg:justify-center">
                {!userData && (
                    <h1 className="text-center font-bold">Profile</h1>
                )}
                {!userData && <HashLoader />}
                {userData && (
                    <>
                        <div className="avatar">
                            <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userData.picture} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="font-bold">{userData.name}</h1>
                            <p>Ranking {userData.rank}</p>
                            <p className="mt-2">{userData.email}</p>
                            <p className="mt-2">Joined {userData.dateJoined}</p>
                        </div>
                    </>
                )}
            </div>

            {/* Message */}
            <div className="bg-base-300 flex flex-col rounded-lg shadow-lg flex-1 lg:max-h-[60rem] lg:h-full lg:self-center overflow-hidden">
                {/* Message display section */}
                <div className="bg-base-200 p-2 rounded-lg rounded-b-none w-full flex flex-col flex-grow gap-2 overflow-y-scroll lg:max-h-[60rem]">
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                </div>
                {/* Input section */}
                <div className="join w-full mt-auto rounded-t-none">
                    <input
                        className="input w-full join-item"
                        placeholder="Aa..."
                    />
                    <button className="btn btn-primary join-item">
                        <IoSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendPage;
