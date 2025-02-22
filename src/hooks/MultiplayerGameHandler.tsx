import { Chess, Square } from "chess.js";
import { useState } from "react";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import { IOptionSquares } from "../interfaces";

const useMultiplayerGameHandler = () => {
    // The game
    const [game, setGame] = useState<Chess>(new Chess());
    // Highlighting the squares
    const [moveFrom, setMoveFrom] = useState<Square | "">("");
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    // Promotion dialog
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    // Make a move
    function makeMove(move: string) {
        const gameCopy = game;
        gameCopy.move({
            from: move.substring(0, 2),
            to: move.substring(2, 4),
            promotion: move.substring(4, 5),
        });

        setGame(gameCopy);
        setMoveFrom("");
        setMoveTo(null);
        setOptionSquares({});
    }

    // Get move options
    function moveAvailable(square: Square): boolean {
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

    function onSquareClick(
        square: Square,
        invokeSendMoveToServer: (move: string) => Promise<void>
    ) {
        // from square
        if (!moveFrom) {
            const hasMoveOptions = moveAvailable(square);
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
                const hasMoveOptions = moveAvailable(square);
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

            invokeSendMoveToServer(`${move.from}${move.to}`);

            // if invalid, setMoveFrom and moveAvailable
            if (move === null) {
                const hasMoveOptions = moveAvailable(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    function onPromotionPieceSelect(
        invokeSendMoveToServer: (move: string) => Promise<void>,
        piece?: PromotionPieceOption
    ) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece && moveFrom && moveTo !== null) {
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });

            setGame(gameCopy);
            invokeSendMoveToServer(`${move.from}${move.to}${move.promotion}`);
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
        makeMove,
    };
};

export default useMultiplayerGameHandler;
