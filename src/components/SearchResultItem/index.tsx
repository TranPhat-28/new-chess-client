import { IoPersonAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { ISearchProfileResult, ITokenData } from "../../interfaces";
import { jwtDecode } from "jwt-decode";

const SearchResultItem = ({
    result,
}: {
    result: ISearchProfileResult | null;
}) => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    // Is you
    const [isYou, setIsYou] = useState<boolean>(true);

    useEffect(() => {
        // Decode the token to get data
        if (token !== null) {
            const data: ITokenData = jwtDecode(token);

            if (result?.name === data.unique_name) {
                setIsYou(true);
            } else {
                setIsYou(false);
            }
        }
    }, [result]);

    return (
        <div className="bg-base-200 rounded-lg shadow-md p-3 flex justify-between">
            {result && (
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={result.picture} />
                        </div>
                    </div>

                    <p className="text-xl font-medium ml-2">
                        {result.name}
                        {isYou && <span className="text-xs ps-1">(You)</span>}
                    </p>
                </div>
            )}

            {/* Only show the "Add Friend" button if not yourself */}
            {result && !isYou && (
                <button className="btn btn-square btn-primary btn-outline">
                    <IoPersonAdd />
                </button>
            )}
            {result === null && (
                <p className="text-red-500">No profile found</p>
            )}
        </div>
    );
};

export default SearchResultItem;
