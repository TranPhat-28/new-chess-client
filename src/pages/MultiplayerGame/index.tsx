import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import MoveHistory from "../../components/MoveHistory";
import PlayerInfoCard from "../../components/PlayerInfoCard";

const MultiplayerGamePage = () => {

    const { id } = useParams();

    // To prevent entering invalid room, verify room with server first
    useEffect(() => {
        console.log("Validate room");
    }, [])

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain">
            <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2 md:quickplay-desktop">
                <div className="w-full md:h-full md:col-start-2 bg-base-200 p-2 rounded-lg font-bold text-lg">
                    <p>Room #{id}</p>
                    <div className="flex gap-2">
                        <PlayerInfoCard randomId={1} />
                        <PlayerInfoCard randomId={2} />
                    </div>
                </div>

                <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2">
                    <Chessboard />
                </div>

                <div className="w-full h-40 md:col-start-2 md:h-full flex flex-col gap-2">
                    <MoveHistory />

                    <button className="btn btn-primary w-full">
                        Quit room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultiplayerGamePage;
