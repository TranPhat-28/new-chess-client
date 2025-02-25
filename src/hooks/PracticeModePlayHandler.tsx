import axios from "axios";
import { Chess, Square } from "chess.js";
import { useEffect, useState } from "react";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IMove, IOptionSquares } from "../interfaces";
import {
    resetQuickplayData,
    setFullHistory,
    setHistory,
} from "../redux/features/quickplaySlice";
import { hideLoading, showCustomAlert, showLoading } from "../utilities";
import { RootState } from "../redux/store";

const usePracticeModePlayHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const history = useSelector((state: RootState) => state.quickplay.history);
    const [historyChanged, setHistoryChanged] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Reset the quickplay data from previous (if any)
        dispatch(resetQuickplayData());

        // Show Loading
        showLoading(dispatch, "Loading");
        const game = new Chess();

        // No changes made to history
        setHistoryChanged(false);

        // Fetch saved game if needed
        if (searchParams.get("progress") === "resume") {
            axios
                .get("/api/PracticeMode/Saved", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    // If success
                    toast.success("Game progress loaded");
                    // Setup the board
                    const moves: IMove[] = response.data.data;
                    moves.sort((a, b) => a.moveIndex - b.moveIndex);
                    moves.forEach((move) => {
                        game.move(move.move);
                    });
                    setGame(game);
                    dispatch(setFullHistory(moves));
                    hideLoading();
                })
                .catch((error) => {
                    hideLoading();
                    navigate("/main/lobby");
                    // Show toast
                    toast.error(error.message);
                });
        } else {
            setGame(game);
            hideLoading();
        }
    }, []);

    // The game
    const [game, setGame] = useState<Chess>(null!);

    // Game over
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

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
                axios.post(
                    "/api/PracticeMode/Move",
                    {
                        fen: game.fen(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ),
                {
                    pending: "AI is thinking...",
                    success: "It's your turn",
                    error: "Something went wrong",
                }
            );

            // Some error happened
            if (!aiMoveResponse.data.isSuccess) {
                // Show alert
                showCustomAlert(
                    "Error",
                    "Oops! Something went wrong on the server",
                    "Home",
                    () => navigate("/"),
                    undefined,
                    <FaRegCircleXmark size={"5rem"} color={"red"} />,
                    true
                );
                console.error(aiMoveResponse.data.message);
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
                            moveIndex: history.length + 1,
                        })
                    );

                    setGame(gameCopy);
                    setMoveFrom("");
                    setMoveTo(null);
                    setOptionSquares({});
                }

                setIsGameOver(true);
                showCustomAlert(
                    "Game Over",
                    `${aiMoveResponse.data.data.wonSide} won with a ${aiMoveResponse.data.data.endgameType}`,
                    "Home",
                    () => navigate("/"),
                    undefined,
                    undefined
                );
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
                        moveIndex: history.length + 1,
                    })
                );

                setGame(gameCopy);
                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});

                if (gameCopy.inCheck()) {
                    toast.warning("Your king is in checked");
                }
            }
        } catch (err) {
            showCustomAlert(
                "Error",
                "Oops! Something went wrong on the server",
                "Home",
                () => navigate("/"),
                undefined,
                <FaRegCircleXmark size={"5rem"} color={"red"} />,
                true
            );
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
                    moveIndex: history.length,
                })
            );

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);
            setHistoryChanged(true);

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
                    moveIndex: history.length,
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
        isGameOver,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
        historyChanged,
    };
};

export default usePracticeModePlayHandler;
