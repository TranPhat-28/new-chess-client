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
        <div className="bg-base-200 h-full w-full pt-4 pb-6 lg:flex lg:flex-row lg:justify-center overflow-y-scroll lg:overflow-hidden">
            {/* Profile container */}
            <div className="p-4 flex flex-col items-center lg:flex-1 lg:max-w-lg">
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

                        <div className="text-center">
                            <h1>{userData.name}</h1>
                            <p>{userData.email}</p>
                            <p className="mt-2">Joined {userData.dateJoined}</p>

                            <ProviderBadge provider={userData.provider} />
                        </div>
                    </>
                )}
            </div>
            {/* Game statistic container */}
            <div className="p-4 flex flex-col lg:flex-1 lg:max-w-lg">
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
