import axios from "axios";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCheck } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import ProviderBadge from "../../components/ProviderBadge";
import useUserAuth from "../../hooks/UserAuthHandler";
import { IGameStatisticData } from "../../interfaces";
import { setUserData } from "../../redux/features/userDataSlice";
import { RootState } from "../../redux/store";
import GameDetailStatisticsModal from "../../components/GameDetailStatisticsModal";

const ProfilePage = () => {
    const dispatch = useDispatch();

    // Logout
    const { LogoutWithError } = useUserAuth();

    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    // Data
    const userData = useSelector((state: RootState) => state.userData.userData);

    const [gameStatisticData, setGameStatisticData] =
        useState<IGameStatisticData | null>(null);

    const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);

    // Fetch data
    useEffect(() => {
        // Only fetch userProfile if no data is presented
        if (userData === null) {
            axios
                .get("/api/Profile/GetProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const information = response.data.data;
                    dispatch(setUserData(information));
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.response.status === 401) {
                        LogoutWithError();
                    } else {
                        toast.error("Oops! Something went wrong");
                    }
                });
        }

        // Always fetch gameStatistic because this change frequently
        axios
            .get("/api/Profile/GetStatistic", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const information = response.data.data;
                setGameStatisticData(information);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.response.status === 401) {
                    LogoutWithError();
                } else {
                    toast.error("Oops! Something went wrong");
                }
            });
    }, []);

    // Open Detail Statistics Modal
    const viewDetailOnClick = () => {
        const modal = document.getElementById(
            "detailStatisticsModal"
        ) as HTMLDialogElement;
        modal.show();
    };

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col lg:flex-row justify-center items-center overflow-hidden">
                {/* Profile */}
                <div className="w-full h-full bg-base-100 rounded-lg flex flex-col p-6">
                    {!userData && (
                        <div className="w-full flex flex-col items-center justify-center my-auto">
                            <HashLoader />
                            <p className="text-gray-500 mt-2">Just a moment</p>
                        </div>
                    )}

                    {userData && (
                        <>
                            <div className="avatar m-auto">
                                <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={userData.picture} />
                                </div>
                            </div>

                            <div className="w-full text-center flex flex-col gap-2  mt-4">
                                <h2 className="font-bold text-2xl lg:text-4xl">
                                    {userData.name}
                                </h2>
                                <p>{userData.email}</p>
                                <p>Joined {userData.dateJoined}</p>

                                <div className="flex w-full max-w-md self-center">
                                    <label className="input input-sm rounded-r-none">
                                        Social ID
                                    </label>
                                    <div className="flex-1 flex items-center justify-center bg-base-200">
                                        {userData.socialId}
                                    </div>
                                    <CopyToClipboard text={userData.socialId}>
                                        <button
                                            className="btn join-item btn-sm rounded-l-none"
                                            onClick={() => {
                                                setCopyToClipboard(true);
                                            }}
                                        >
                                            {!copyToClipboard && <FaRegCopy />}
                                            {copyToClipboard && <FaCheck />}
                                        </button>
                                    </CopyToClipboard>
                                </div>

                                <div className="w-full"></div>
                                <ProviderBadge provider={userData.provider} />
                            </div>
                        </>
                    )}
                </div>

                {/* Game Statistics */}
                <div className="w-full h-full bg-base-100 rounded-lg flex flex-col p-6">
                    {!gameStatisticData && (
                        <div className="w-full flex flex-col items-center justify-center my-auto">
                            <HashLoader />
                            <p className="text-gray-500 mt-2">Just a moment</p>
                        </div>
                    )}

                    {gameStatisticData && (
                        <>
                            <table className="table">
                                <tbody>
                                    <tr className="hover">
                                        <td className="font-bold">Ranking</td>
                                        <td>{gameStatisticData.ranking}</td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode played:
                                        </td>
                                        <td>
                                            {gameStatisticData.practicePlayedEasy +
                                                gameStatisticData.practicePlayedMedium +
                                                gameStatisticData.practicePlayedHard}
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode victory:
                                        </td>
                                        <td>
                                            {gameStatisticData.practiceVictoryEasy +
                                                gameStatisticData.practiceVictoryMedium +
                                                gameStatisticData.practiceVictoryHard}
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Online mode played:
                                        </td>
                                        <td>
                                            {gameStatisticData.onlinePlayed}
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Online mode victory:
                                        </td>
                                        <td>
                                            {gameStatisticData.onlineVictory}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                className="btn btn-primary btn-outline btn-sm lg:mt-6 self-center"
                                onClick={viewDetailOnClick}
                            >
                                View Detail
                            </button>
                        </>
                    )}
                </div>
            </div>

            <GameDetailStatisticsModal gameStatisticData={gameStatisticData} />
        </div>
    );
};

export default ProfilePage;
