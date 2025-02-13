import { FaQuestion } from "react-icons/fa6";
import { IPlayerInfoCardData } from "../../interfaces";
import { BeatLoader } from "react-spinners";

const PlayerInfoCard = ({
    player,
    isHost,
}: {
    player: IPlayerInfoCardData | null;
    isHost: boolean;
}) => {
    return (
        <div
            className={`rounded-lg ${
                isHost ? "bg-base-100" : "bg-gray-800 text-white"
            } shadow-lg flex-1 flex p-2 gap-2`}
        >
            <div className="h-12 w-12 rounded-full overflow-hidden shadow-sm bg-base-100">
                {player && (
                    <img
                        src={player.picture}
                        alt={"Player profile picture"}
                        className="h-full w-full"
                    />
                )}
                {!player && (
                    <FaQuestion className="w-full h-full p-2 text-red-300 bg-gray-200" />
                )}
            </div>

            <div className="flex-1">
                {player && (
                    <>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-sm font-normal">{player.socialId}</p>
                    </>
                )}
                {!player && (
                    <>
                        <p className="font-bold">Waiting</p>
                        <BeatLoader
                            size={10}
                            color={"white"}
                            cssOverride={{
                                height: 20,
                                alignItems: "center",
                                display: "flex",
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default PlayerInfoCard;
