import { FaRegSadCry } from "react-icons/fa";

const ErrorCard = () => {
    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col items-center justify-center">
            <FaRegSadCry size={"6rem"} color={"#9ca3af"} />
            <p className="text-gray-400 lg:mt-2">Something went wrong</p>
        </div>
    );
};

export default ErrorCard;
