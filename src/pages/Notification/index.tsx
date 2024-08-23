import { BsInbox } from "react-icons/bs";
import FriendRequestItem from "../../components/FriendRequestItem";

const NotificationPage = () => {
    interface IDummyNotification {
        id: number;
        title: string;
    }

    const dummyData: IDummyNotification[] = [
        { id: 1, title: "Sunrise" },
        { id: 2, title: "Moonlight" },
        { id: 3, title: "Ocean Breeze" },
        { id: 4, title: "Mountain Peak" },
        { id: 5, title: "Forest Trail" },
        { id: 6, title: "Desert Mirage" },
        { id: 7, title: "City Lights" },
        { id: 8, title: "River Bend" },
        { id: 9, title: "Autumn Leaves" },
        { id: 10, title: "Winter Snow" },
        { id: 11, title: "Spring Blossom" },
        { id: 12, title: "Summer Heat" },
        { id: 13, title: "Starry Night" },
        { id: 14, title: "Gentle Rain" },
        { id: 15, title: "Thunderstorm" },
        { id: 16, title: "Morning Dew" },
        { id: 17, title: "Golden Sunset" },
        { id: 18, title: "Whispering Winds" },
        { id: 19, title: "Silent Night" },
        { id: 20, title: "Crimson Sky" },
    ];

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col lg:flex-row justify-center items-center overflow-hidden">
                {/* Friend Requests */}
                <div className="w-full lg:h-full bg-base-100 rounded-lg flex-1 flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Friend Requests
                    </p>

                    {/* <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {dummyData.length > 0 &&
                            dummyData.map(() => <FriendRequestItem />)}
                    </div> */}
                    <div className="h-full w-full bg-base-100 rounded-lg flex flex-col items-center justify-center">
                        <BsInbox size={"6rem"} color={"#9ca3af"} />
                        <p className="text-gray-400">No new requests</p>
                    </div>
                </div>

                {/* Notification */}
                <div className="w-full lg:h-full bg-base-100 rounded-lg flex-1 flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Notifications
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {dummyData.length > 0 &&
                            dummyData.map(() => <FriendRequestItem />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
