import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
    IDetailProfileSearchResult,
    IRelationshipStatus,
} from "../../../interfaces";
import { RootState } from "../../../redux/store";
import RelationshipStatusBadge from "../../RelationshipStatusBadge";
import SocialActions from "../../SocialActions";

const ProfileDetailCard = () => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    const { id } = useParams();
    const navigate = useNavigate();

    const [dataA, setDataA] = useState<IDetailProfileSearchResult | null>(null);
    const [dataB, setDataB] = useState<IRelationshipStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        setLoading(true);

        // Request: Detail information - For displaying detail information of search target
        const requestA = axios.get(`/api/Social/Detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Request: Relationship status with target - For displaying corresponding action buttons
        const requestB = axios.get(`/api/Social/Relationship/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Make the requests
        axios
            .all([requestA, requestB])
            .then(
                axios.spread((responseA, responseB) => {
                    // HANDLE RESPONSES ACCORDINGLY

                    // Response A: Detail information
                    // Check for success status in here as well
                    if (responseA.data.isSuccess) {
                        setDataA(responseA.data.data);
                    } else {
                        navigate("/main/social/error");
                        toast.error(responseA.data.message);
                    }

                    // Response B: Relationship status
                    setDataB(responseB.data.data);
                })
            )
            .catch(function (error) {
                navigate("/main/social/error");
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-2 lg:gap-4 p-4 items-center justify-center">
            {loading && (
                <>
                    <HashLoader />
                    <p className="text-gray-500 mt-2">Just a moment</p>
                </>
            )}

            {dataA && (
                <>
                    <div className="flex w-full bg-base-200 rounded-lg">
                        <div className="avatar p-4">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src={dataA.picture} />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="font-bold md:text-xl lg:text-2xl ps-1">
                                {dataA.name}
                            </p>
                            <p className="ps-1">Rank {dataA.rank}</p>
                            {dataB && (
                                <RelationshipStatusBadge
                                    isFriend={dataB.isFriend}
                                />
                            )}
                        </div>
                    </div>
                    {dataB && <SocialActions data={dataB} />}
                </>
            )}
        </div>
    );
};

export default ProfileDetailCard;
