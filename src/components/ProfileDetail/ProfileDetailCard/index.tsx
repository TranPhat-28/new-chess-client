import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IDetailProfileSearchResult } from "../../../interfaces";
import { RootState } from "../../../redux/store";

const ProfileDetailCard = () => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<IDetailProfileSearchResult | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        setLoading(true);

        axios
            .post(
                "/api/Social/Detail",
                {
                    socialId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                // Response 200
                // Check for success status in here as well
                if (response.data.isSuccess) {
                    console.log(response.data.data);
                    setData(response.data.data);
                } else {
                    navigate("/main/social/error");
                    toast.error(response.data.message);
                }
            })
            .catch(function (error) {
                navigate("/main/social/error");
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-4 p-4 items-center justify-center">
            {loading && (
                <>
                    <HashLoader />
                    <p className="text-gray-500 mt-2">Just a moment</p>
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
                            <p className="font-bold md:text-xl lg:text-2xl">
                                {data.name}
                            </p>
                            <p>Rank {data.rank}</p>
                            <p>You are {data.isFriend ? "" : "NOT"} friend</p>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <button className="btn btn-primary btn-outline flex-1">
                            Go to chat
                        </button>
                        {data.isFriend === false && (
                            <button className="btn btn-primary btn-outline flex-1">
                                Add friend
                            </button>
                        )}
                        {data.isFriend === true && (
                            <button className="btn btn-error btn-outline flex-1">
                                Remove friend
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDetailCard;
