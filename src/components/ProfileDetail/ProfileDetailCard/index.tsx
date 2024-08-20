import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

const ProfileDetailCard = () => {
    const { id } = useParams();

    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch data
    useEffect(() => {
        setTimeout(() => {
            setData("Data for use id " + id);
            setLoading(false);
        }, 2000);
    });

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
                    <div className="flex bg-red-200 w-full gap-4">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src="https://picsum.photos/200" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="font-bold md:text-xl lg:text-2xl">Name</p>
                            <p>Rank 1862</p>
                            <p>Friend status</p>
                        </div>
                    </div>
                    <div className="flex bg-blue-200 w-full gap-4">
                        <button className="btn btn-primary btn-outline flex-1">
                            A
                        </button>
                        <button className="btn btn-primary btn-outline flex-1">
                            B
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDetailCard;
