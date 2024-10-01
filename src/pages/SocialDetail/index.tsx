import { useEffect, useState } from "react";
import { FaRegSadCry } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { HashLoader } from "react-spinners";
import {
    IDetailProfileSearchResult,
    IRelationshipStatus,
} from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import RelationshipStatusBadge from "../../components/RelationshipStatusBadge";

const SocialDetailPage = ({ keyword }: { keyword: string | null }) => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);
    // Data fetching
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    // Data for displaying
    const [data, setData] = useState<IDetailProfileSearchResult | null>(null);

    useEffect(() => {
        // Only fetch with keyword
        if (keyword) {
            setError(false);
            setLoading(true);
            setData(null);

            // Request: Detail information - For displaying detail information of search target
            axios
                .get(`/api/Social/Detail/${keyword}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [keyword]);

    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-2 lg:gap-4 p-4 items-center justify-center">
            {!keyword && (
                <>
                    <MdPersonSearch size={"6rem"} color={"#9ca3af"} />
                    <p className="text-gray-400">Profile Details</p>
                </>
            )}

            {loading && (
                <>
                    <HashLoader />
                    <p className="text-gray-500 mt-2">Just a moment</p>
                </>
            )}

            {error && (
                <>
                    <FaRegSadCry size={"6rem"} color={"#9ca3af"} />
                    <p className="text-gray-400 lg:mt-2">
                        Something went wrong
                    </p>
                </>
            )}

            {data && (
                <>
                    <div className="flex w-full bg-base-200 rounded-lg">
                        <div className="avatar p-4">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src={data.picture} />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="font-bold md:text-xl lg:text-2xl ps-1">
                                {data.name}
                            </p>
                            <p className="ps-1">Rank {data.rank}</p>
                            {data.isFriend !== null && (
                                <RelationshipStatusBadge
                                    isFriend={data.isFriend}
                                />
                            )}
                        </div>
                    </div>

                    {/* <SocialActions
                        data={dataB}
                        setIsFriendBadgeState={setIsFriend}
                    /> */}
                </>
            )}
        </div>
    );
};

export default SocialDetailPage;
