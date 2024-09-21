import { MdPersonSearch } from "react-icons/md";

const PlaceholderCard = ({ placeholderText }: { placeholderText: string }) => {
    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col items-center justify-center">
            <MdPersonSearch size={"6rem"} color={"#9ca3af"} />
            <p className="text-gray-400">{placeholderText}</p>
        </div>
    );
};

export default PlaceholderCard;
