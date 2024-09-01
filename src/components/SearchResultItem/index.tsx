import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ISearchProfileResult, ITokenData } from "../../interfaces";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const SearchResultItem = ({ result }: { result: ISearchProfileResult }) => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    // Navigate
    const navigate = useNavigate();

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
        <div className="bg-base-200 flex-shrink-0 flex justify-between p-4">
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
            <div className="flex items-center">
                {!isYou && (
                    <button
                        className={"btn btn-primary btn-outline h-fit"}
                        onClick={() =>
                            navigate(`/main/social/${result.socialId}`)
                        }
                    >
                        <FaSearch />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchResultItem;
