import ProviderBadge from "../../components/ProviderBadge";

const ProfilePage = () => {
    return (
        <div className="bg-base-200 h-full w-full p-2 lg:flex lg:flex-row lg:justify-center overflow-y-scroll lg:overflow-hidden lg:pt-4">
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
                    <table className="table table-sm lg:table-md">
                        <tbody className="collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                                Click to show details
                            </div>

                            <tr className="hover flex justify-between">
                                <th>Ranking:</th>
                                <td>0000</td>
                            </tr>

                            <tr className="hover flex justify-between">
                                <th>Single game played (total):</th>
                                <td>0000</td>
                            </tr>

                            <tr className="hover flex justify-between">
                                <th>Single game victory (total):</th>
                                <td>0000</td>
                            </tr>

                            <div className="collapse-content">
                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game played (Easy):
                                    </th>
                                    <td>0000</td>
                                </tr>

                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game victory (Easy):
                                    </th>
                                    <td>0000</td>
                                </tr>

                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game played (Medium):
                                    </th>
                                    <td>0000</td>
                                </tr>

                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game victory (Medium):
                                    </th>
                                    <td>0000</td>
                                </tr>

                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game played (Hard):
                                    </th>
                                    <td>0000</td>
                                </tr>

                                <tr className="hover">
                                    <th className="font-normal">
                                        Single game victory (Hard):
                                    </th>
                                    <td>0000</td>
                                </tr>
                            </div>

                            <tr className="hover flex justify-between">
                                <th>Versus game played:</th>
                                <td>0000</td>
                            </tr>

                            <tr className="hover flex justify-between">
                                <th>Versus game victory:</th>
                                <td>0000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
