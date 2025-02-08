const PlayerInfoCard = ({ randomId }: { randomId: number }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-lg flex-1 flex p-2 gap-2">
            <div className="h-12 w-12 rounded-full overflow-hidden shadow-sm bg-base-100">
                <img
                    src={"https://picsum.photos/200"}
                    alt={"Guess player"}
                    className="h-full w-full"
                />
            </div>

            <div className="flex-1">
                <p className="font-bold">
                    Player#{randomId}
                </p>
                <p className="text-sm">Social ID</p>
            </div>
        </div>
    );
};

export default PlayerInfoCard;