import ProviderBadge from "../../components/ProviderBadge";

const ProfilePage = () => {
    return (
        <div className="bg-base-200 h-full w-full pt-4 pb-6 lg:flex lg:flex-row lg:justify-center overflow-y-scroll lg:overflow-hidden lg:pt-4">
            {/* Profile container */}
            <div className="p-4 flex flex-col items-center lg:flex-1 lg:max-w-lg">
                <div className="avatar">
                    <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://picsum.photos/200" />
                    </div>
                </div>

                <div className="text-center">
                    <h1>Display name</h1>
                    <p>email@mail.com</p>
                    <p className="mt-2">Joined dd/mm/yyyy</p>

                    <ProviderBadge provider={"Google"} />
                </div>
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
