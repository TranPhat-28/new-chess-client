import { useEffect, useState } from "react";
import ProviderBadge from "../../components/ProviderBadge";
import axios from "axios";
import useUserAuth from "../../hooks/UserAuthHandler";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const ProfilePage = () => {
    // Logout
    const { LogoutWithError } = useUserAuth();

    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    // Data
    const [name, setName] = useState<string | null>(null);
    const [img, setImg] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [dateJoined, setDateJoined] = useState<string | null>(null);
    const [provider, setProvider] = useState<string | null>(null);

    // Fetch data
    useEffect(() => {
        axios
            .get("/api/Profile/GetProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const information = response.data.data;
                setName(information.name);
                setImg(information.picture.replace("s96-c", "s192-c"));
                setEmail(information.email);
                setDateJoined(information.dateJoined);
                setProvider(information.provider);
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
        <div className="bg-base-200 h-full w-full pt-4 pb-6 lg:flex lg:flex-row lg:justify-center overflow-y-scroll lg:overflow-hidden lg:pt-4">
            {/* Profile container */}
            <div className="p-4 flex flex-col items-center lg:flex-1 lg:max-w-lg">
                {name && (
                    <>
                        <div className="avatar">
                            <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img!} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h1>{name}</h1>
                            <p>{email}</p>
                            <p className="mt-2">Joined {dateJoined}</p>

                            <ProviderBadge provider={provider!} />
                        </div>
                    </>
                )}
            </div>
            {/* Game statistic container */}
            <div className="flex flex-col lg:flex-1 lg:max-w-lg">
                <h1 className="text-center font-bold">Game statistics</h1>
                <div className="max-w-xl self-center">
                    <table className="table">
                        <tbody>
                            <tr className="hover">
                                <td className="font-bold">Ranking</td>
                                <td>Value</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode game played:
                                </td>
                                <td>Value</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode game victory:
                                </td>
                                <td>Value</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Online mode game played:
                                </td>
                                <td>Value</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Online mode game victory:
                                </td>
                                <td>Value</td>
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
                                        Practice mode game played (Easy)
                                    </td>
                                    <td>Value</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Practice mode game victory (Easy)
                                    </td>
                                    <td>Value</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Practice mode game played (Medium)
                                    </td>
                                    <td>Value</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Practice mode game victory (Medium)
                                    </td>
                                    <td>Value</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Practice mode game played (Hard)
                                    </td>
                                    <td>Value</td>
                                </tr>
                                <tr className="hover">
                                    <td className="font-bold">
                                        Practice mode game victory (Hard)
                                    </td>
                                    <td>Value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
