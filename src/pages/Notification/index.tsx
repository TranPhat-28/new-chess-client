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
        <div className="h-full w-full p-2 md:p-4 gap-2 md:gap-4 flex flex-col lg:flex-row max-w-lg md:max-w-xl lg:max-w-5xl self-center justify-center overflow-hidden lg:items-center">
            <div className="h-full w-full lg:max-h-[60rem] flex flex-col lg:flex-row gap-2 md:gap-3 lg:gap-4">
                <div className="flex-1 bg-base-300 p-2 md:p-4 rounded-lg flex flex-col overflow-hidden">
                    <p className="font-bold text-2xl">Friend requests</p>
                    <div className="bg-gray-300 p-2 rounded-lg w-full h-full flex flex-col gap-2 overflow-y-scroll">
                        {dummyData.length > 0 &&
                            dummyData.map((item) => (
                                <NotificationItem key={item.id} id={item.id} title={item.title} />
                            ))}
                    </div>
                </div>
                <div className="flex-1 bg-base-300 p-2 md:p-4 rounded-lg flex flex-col overflow-hidden">
                    <p className="font-bold text-2xl">Notifications</p>
                    <div className="bg-gray-300 p-2 rounded-lg w-full h-full flex flex-col gap-2 overflow-y-scroll">
                        {dummyData.length > 0 &&
                            dummyData.map((item) => (
                                <NotificationItem key={item.id} id={item.id} title={item.title} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;

const NotificationItem = ({ id, title }: { id: number; title: string }) => {
    return (
        <div className="bg-base-200 p-2 flex justify-between rounded-lg shadow-lg">
            <div className="flex flex-col justify-center">
                <p className="font-bold text-xl">{title}</p>
                <p>Request id: {id}</p>
            </div>
            <button className="btn btn-primary btn-outline">
                Action
            </button>
        </div>
    );
};
