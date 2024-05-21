import axios from "axios";
import { Chess, Square } from "chess.js";
import { useState } from "react";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import { useDispatch } from "react-redux";
import { setHistory } from "../redux/features/quickplaySlice";
import { IOptionSquares } from "../interfaces";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import CustomConfirmAlert from "../components/CustomConfirmAlert";
import { useNavigate } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";

const useQuickplayHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // The game
    const [game, setGame] = useState<Chess>(
        // White move - Black win
        // new Chess("7r/8/8/8/8/1k6/8/1K6 w - - 0 1")
        // White move - White win
        // new Chess("7k/8/6K1/8/8/8/8/R7 w - - 0 1")
        new Chess()
    );

    // Highlighting the squares
    const [moveFrom, setMoveFrom] = useState<Square | "">("");
    const [moveTo, setMoveTo] = useState<Square | null>(null);

    // Promotion dialog
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    // Get move options
    function getMoveOptions(square: Square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares: IOptionSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                    game.get(move.to).color !== game.get(square).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    // Fetch Stockfish response
    async function fetchAiResponseMove() {
        try {
            const aiMoveResponse = await toast.promise(
                axios.post("/api/Singleplayer/Guess", {
                    guessModeInputFEN: game.fen(),
                }),
                {
                    pending: "AI is thinking...",
                    error: "Something went wrong",
                }
            );

            // Some error happened
            if (!aiMoveResponse.data.isSuccess) {
                // Show alert
                confirmAlert({
                    overlayClassName: "bg-overlay-important",
                    customUI: ({ onClose }) => {
                        return (
                            <CustomConfirmAlert
                                onClose={onClose}
                                title={"Error"}
                                content={
                                    "Oops! Something went wrong on the server."
                                }
                                svg={
                                    <FaRegCircleXmark
                                        size={"5rem"}
                                        color={"red"}
                                    />
                                }
                                confirmText={"Home"}
                                confirmCallback={() => navigate("/")}
                                hideCancelButton={true}
                            />
                        );
                    },
                });
                console.log(aiMoveResponse.data.message);
            }
            // If gameover
            else if (aiMoveResponse.data.data.isGameOver) {
                // Make the move (if Black won)
                if (aiMoveResponse.data.data.wonSide === "Black") {
                    const gameCopy = game;
                    const move = gameCopy.move({
                        from: aiMoveResponse.data.data.from,
                        to: aiMoveResponse.data.data.to,
                        promotion: aiMoveResponse.data.data.promotion,
                    });

                    dispatch(
                        setHistory({
                            side: "black",
                            move: `${move.from}${move.to}`,
                        })
                    );

                    setGame(gameCopy);
                    setMoveFrom("");
                    setMoveTo(null);
                    setOptionSquares({});
                }

                confirmAlert({
                    overlayClassName: "bg-overlay-important",
                    customUI: ({ onClose }) => {
                        return (
                            <CustomConfirmAlert
                                onClose={onClose}
                                title={"Game Over"}
                                content={`${aiMoveResponse.data.data.wonSide} won with a ${aiMoveResponse.data.data.endgameType}`}
                                confirmText={"Home"}
                                confirmCallback={() => navigate("/")}
                            />
                        );
                    },
                });
            } else {
                const gameCopy = game;
                const move = gameCopy.move({
                    from: aiMoveResponse.data.data.from,
                    to: aiMoveResponse.data.data.to,
                    promotion: aiMoveResponse.data.data.promotion,
                });

                dispatch(
                    setHistory({
                        side: "black",
                        move: `${move.from}${move.to}`,
                    })
                );

                setGame(gameCopy);
                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});
            }
        } catch (err) {
            confirmAlert({
                overlayClassName: "bg-overlay-important",
                customUI: ({ onClose }) => {
                    return (
                        <CustomConfirmAlert
                            onClose={onClose}
                            title={"Error"}
                            content={
                                "Oops! Something went wrong on the server."
                            }
                            svg={
                                <FaRegCircleXmark size={"5rem"} color={"red"} />
                            }
                            confirmText={"Home"}
                            confirmCallback={() => navigate("/")}
                            hideCancelButton={true}
                        />
                    );
                },
            });
        }
    }

    function onSquareClick(square: Square) {
        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                square: moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square
            );
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            dispatch(
                setHistory({
                    side: "white",
                    move: `${move.from}${move.to}`,
                })
            );

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);

            fetchAiResponseMove();
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    function onPromotionPieceSelect(piece?: PromotionPieceOption) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece && moveFrom && moveTo !== null) {
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });

            dispatch(
                setHistory({
                    side: "white",
                    move: `${move.from}${move.to}`,
                })
            );

            setGame(gameCopy);
            fetchAiResponseMove();
        }

        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    return {
        game,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    };
};

export default useQuickplayHandler;
