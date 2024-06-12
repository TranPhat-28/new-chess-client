import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const ProviderBadge = ({ provider }: { provider: string }) => {
    return (
        <div className="bg-base-100 flex gap-2 p-2 rounded-lg shadow-md mt-2">
            {provider === "Google" && <FcGoogle />}
            {provider === "Facebook" && <FaFacebookF />}
            <span>Connected with {provider}</span>
        </div>
    );
};

export default ProviderBadge;
