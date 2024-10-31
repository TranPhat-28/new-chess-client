import { FaMedal } from "react-icons/fa6";

const EventDetailsPlaceholder = () => {
    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-2 lg:gap-4 p-4 items-center justify-center">
            <FaMedal size={"6rem"} color={"#9ca3af"} />
            <p className="text-gray-400">Event Details</p>
        </div>
    );
};

export default EventDetailsPlaceholder;
