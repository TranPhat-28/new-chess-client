import { RiCalendarEventFill } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import { IEventItem } from "../../interfaces";

const dummyDataA: IEventItem[] = [
    {
        title: "Championship 43",
        content: "Weekly championship week 43 of 2024",
        image: "https://picsum.photos/id/237/200/300",
        status: "ON GOING",
    },
    {
        title: "Chess Master S3",
        content: "Chess Master season 3 of 2024",
        image: "https://picsum.photos/id/237/200/300",
        status: "ON GOING",
    },
    {
        title: "Championship 44",
        content: "Weekly championship week 44 of 2024",
        image: "https://picsum.photos/id/237/200/300",
        status: "UP COMING",
    },
    {
        title: "Championship 42",
        content: "Weekly championship week 42 of 2024",
        image: "https://picsum.photos/id/237/200/300",
        status: "CLOSED",
    },
    {
        title: "Example Event",
        content: "Description for Example Event",
        image: "https://picsum.photos/id/237/200/300",
        status: "CLOSED",
    },
    {
        title: "Example Event",
        content: "Description for Example Event",
        image: "https://picsum.photos/id/237/200/300",
        status: "CLOSED",
    },
];

const EventsLayout = () => {
    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col lg:flex-row justify-center items-center overflow-hidden">
                {/* Search result list */}
                <div className="h-3/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Events
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {/* Loading */}
                        {/* {loading && (
                            <div className="w-full h-full flex justify-center items-center">
                                <HashLoader />
                            </div>
                        )} */}

                        {/* No events */}
                        {dummyDataA && dummyDataA.length === 0 && (
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <RiCalendarEventFill
                                    size={"6rem"}
                                    color={"#9ca3af"}
                                />
                                <p className="text-gray-400 mt-2">
                                    More events coming soon!
                                </p>
                            </div>
                        )}
                        {/* Events list */}
                        {dummyDataA.length > 0 &&
                            dummyDataA.map((event) => (
                                <EventItem event={event} />
                            ))}
                    </div>
                </div>

                {/* Profile */}
                <Outlet />
            </div>
        </div>
    );
};

export default EventsLayout;

const EventItem = ({ event }: { event: IEventItem }) => {
    return (
        <div
            className={`bg-base-200 flex-shrink-0 flex justify-between p-1 sm:p-2 ${
                event.status === "ON GOING"
                    ? "cursor-pointer duration-100 hover:brightness-90"
                    : ""
            } relative`}
        >
            {/* Overlay */}
            {event.status !== "ON GOING" && (
                <div className="absolute w-full h-full bg-black opacity-80 top-0 left-0 grid place-content-center">
                    <p className="text-white font-bold text-xl">
                        {event.status as string}
                    </p>
                </div>
            )}
            <div className="flex items-center w-full">
                <div
                    className={`avatar ${
                        event.status !== "ON GOING" ? "opacity-20" : ""
                    }`}
                >
                    <div className="h-24 rounded">
                        <img src={event.image} />
                    </div>
                </div>

                <div className="flex-grow flex flex-col h-full p-2">
                    <div className="flex-grow">
                        <p className="font-bold">{event.title}</p>
                        <p className="text-xs italic">{event.content}</p>
                    </div>
                    <p className="text-xs self-end">See more</p>
                </div>
            </div>
        </div>
    );
};
