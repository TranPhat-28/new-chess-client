import { useEffect, useState } from "react";
import ProviderBadge from "../../components/ProviderBadge";
import axios from "axios";
import useUserAuth from "../../hooks/UserAuthHandler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { setUserData } from "../../redux/features/userDataSlice";
import { IGameStatisticData } from "../../interfaces";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

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

    return (
        <div className="h-full w-full p-4 lg:p-6 lg:flex lg:flex-row lg:gap-4 lg:justify-center overflow-y-scroll lg:overflow-hidden">
            {/* Profile container */}
            <div className="bg-base-300 rounded-lg shadow-lg max-w-md mx-auto lg:mr-0 p-4 flex flex-col items-center lg:flex-1 lg:max-w-lg mb-4 lg:mb-0 lg:h-full lg:max-h-[46rem] self-center lg:justify-center gap-4">
                {!userData && (
                    <h1 className="text-center font-bold">Profile</h1>
                )}
                {!userData && <PulseLoader />}
                {userData && (
                    <>
                        <div className="avatar">
                            <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userData.picture} />
                            </div>
                        </div>

                        <div className="w-full text-center flex flex-col gap-2">
                            <h2 className="font-bold text-2xl lg:text-4xl">
                                {userData.name}
                            </h2>
                            <p>{userData.email}</p>
                            <p>Joined {userData.dateJoined}</p>

                            <div className="flex w-full">
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
            {/* Game statistic container */}
            <div className="bg-base-300 rounded-lg shadow-lg max-w-md mx-auto lg:ml-0 p-4 flex flex-col lg:flex-1 lg:max-w-lg lg:h-full lg:max-h-[46rem] self-center">
                <h1 className="text-center font-bold">Game statistics</h1>
                {!gameStatisticData && (
                    <div className="w-full flex justify-center">
                        <PulseLoader />
                    </div>
                )}
                {gameStatisticData && (
                    <div className="max-w-xl self-center">
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
                                    <td>{gameStatisticData.onlinePlayed}</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Online mode victory:
                                    </td>
                                    <td>{gameStatisticData.onlineVictory}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium w-full max-w-xl">
                                Show detail game statistics
                            </div>

                            <table className="table collapse-content">
                                <tbody>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode played (Easy)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practicePlayedEasy
                                            }
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode victory (Easy)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practiceVictoryEasy
                                            }
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode played (Medium)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practicePlayedMedium
                                            }
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode victory (Medium)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practiceVictoryMedium
                                            }
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode played (Hard)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practicePlayedHard
                                            }
                                        </td>
                                    </tr>
                                    <tr className="hover">
                                        <td className="font-bold">
                                            Practice mode victory (Hard)
                                        </td>
                                        <td>
                                            {
                                                gameStatisticData.practiceVictoryHard
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
