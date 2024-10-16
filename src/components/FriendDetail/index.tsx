import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const FriendDetail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        console.log("Perform fetch data");
        setData({
            picture: "https://picsum.photos/200",
            rank: "N/A",
            name: "Joe",
        });
    }, []);

    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-2 lg:gap-4 p-4 items-center justify-center">
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
                            <p className="font-bold md:text-xl lg:text-2xl ps-1">
                                {data.name}
                            </p>
                            <p className="ps-1">Rank {data.rank}</p>
                            <div className="px-2 mt-2 flex gap-2 bg-base-100 shadow-lg rounded-lg items-center">
                                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm">Online</span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="flex flex-col w-full gap-4">
                        <div className="w-full flex gap-4">
                            <button className="btn btn-primary btn-outline flex-1">
                                Go to chat
                            </button>

                            <button className="btn btn-error btn-outline flex-1">
                                Remove friend
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FriendDetail;
