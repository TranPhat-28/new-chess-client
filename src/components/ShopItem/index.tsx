import { IPurchasableItem } from "../../interfaces";

const ShopItem = ({ data }: { data: IPurchasableItem }) => {
    const onClickHanlder = () => {
        const modal = document.getElementById(
            "shopItemDetails"
        ) as HTMLDialogElement;
        modal.show();
    };

    return (
        <div className="w-full h-fit bg-base-200 p-3 rounded-lg flex gap-2">
            <img src="https://picsum.photos/200" alt="item" className="w-36" />
            <div className="w-full flex flex-col justify-between overflow-hidden">
                <div className="w-full">
                    <p className="font-bold text-lg">{data.name}</p>
                    <p className="truncate mb-2">{data.detail}</p>
                    {data.type === "theme" && (
                        <div className="badge badge-primary badge-outline">
                            Theme
                        </div>
                    )}

                    {data.type === "skin" && (
                        <div className="badge badge-secondary badge-outline">
                            Skin
                        </div>
                    )}

                    {data.type === "other" && (
                        <div className="badge badge-info badge-outline">
                            Other
                        </div>
                    )}
                </div>

                <div className="w-full flex justify-between items-center">
                    <p className="text-2xl">{data.price}
                        <span className="text-xs">VND</span>
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={onClickHanlder}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopItem;
