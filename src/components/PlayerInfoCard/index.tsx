import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const PlayerInfoCard = ({ randomId }: { randomId: number }) => {
    // Random Identicon
    const svgURI = useMemo(
        () =>
            "data:image/svg+xml;utf8," +
            encodeURIComponent(minidenticon(randomId.toString(), 100, 50)),
        [randomId]
    );

    return (
        <div className="bg-base-200 rounded-lg shadow-lg flex-1 flex p-2 gap-2 md:items-center md:pl-6 md:pr-6 md:gap-6">
            <div className="h-12 w-12 md:h-24 md:w-24 rounded-full bg-base-100">
                <img
                    src={svgURI}
                    alt={"Guess player"}
                    className="h-full w-full"
                />
            </div>

            <div className="flex-1">
                <>
                    <p className="font-bold md:text-3xl">Player#{randomId % 1000}</p>
                    <p className="text-sm md:text-2xl">Ranking N/A</p>
                </>
            </div>

            <div
                className="tooltip hidden md:block"
                data-tip="You can send friend request after the game has finished"
            >
                <FaCircleInfo size={"40px"} />
            </div>
        </div>
    );
};

export default PlayerInfoCard;

{
    /* <div className="bg-base-200 rounded-lg shadow-lg flex-1 flex p-2 gap-2 md:items-center md:pl-6 md:pr-6 md:gap-6">
            <div className="h-12 w-12 md:h-24 md:w-24 rounded-full bg-base-100">
                {player === "random" && (
                    // The random should be retrieve from the backend
                    <img
                        src={svgURI}
                        alt={"Guess player"}
                        className="h-full w-full"
                    />
                )}
                {player === "ai" && (
                    <img src={"/ai.png"} alt={"AI"} className="h-full w-full" />
                )}
            </div>

            <div className="flex-1">
                {player === "random" && (
                    <>
                        <p className="font-bold md:text-3xl">Player#{69420}</p>
                        <p className="text-sm md:text-2xl">Ranking N/A</p>
                    </>
                )}

                {player === "ai" && (
                    <>
                        <p className="font-bold md:text-3xl">Stockfish AI</p>
                        <p className="text-sm md:text-2xl">Ranking N/A</p>
                    </>
                )}
            </div>

            <div
                className="tooltip hidden md:block"
                data-tip="You can send friend request after the game has finished"
            >
                <FaCircleInfo size={"40px"} />
            </div>
        </div> */
}
