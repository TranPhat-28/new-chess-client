import { Chessboard } from "react-chessboard";
import { useNavigate, useParams } from "react-router-dom";
import MoveHistory from "../../components/MoveHistory";
import PlayerInfoCard from "../../components/PlayerInfoCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../../utilities";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IRoomInfoResponse } from "../../interfaces";

const MultiplayerGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // To prevent entering invalid room, verify room with server first
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["roomIsValid"],
        queryFn: async () => {
            const response = await axios.get<IRoomInfoResponse>(
                `/api/Multiplayer/${id}`
            );
            return response.data;
        },
    });

    // Effects
    useEffect(() => {
        if (isPending) {
            showLoading(dispatch, "Loading");
        } else if (isError) {
            hideLoading();
            console.log(error);
            navigate("/main/lobby");
            toast.error("Cannot join the room");
        } else if (!data.data) {
            // If room does not exist
            hideLoading();
            navigate("/main/lobby");
            toast.error("Room does not exist");
        } else {
            hideLoading();
        }
    }, [isPending, isError, data, error]);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain">
            {data && (
                <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2 md:quickplay-desktop">
                    <div className="w-full md:h-full md:col-start-2 bg-base-200 p-2 rounded-lg font-bold text-lg">
                        <p>Room #{id}</p>
                        <div className="flex gap-2">
                            <PlayerInfoCard
                                player={data.data?.host ?? null}
                                isHost={true}
                            />
                            <PlayerInfoCard
                                player={data.data?.player ?? null}
                                isHost={false}
                            />
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
            )}
        </div>
    );
};

export default MultiplayerGamePage;
