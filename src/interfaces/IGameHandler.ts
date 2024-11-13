export interface IOptionSquares {
    [key: string]: {
        background: string;
        borderRadius?: string;
    };
}

export interface IMove {
    side: "black" | "white";
    move: string;
}

export interface IQuickplayDataState {
    history: IMove[];
    winner: "black" | "white" | null;
}
