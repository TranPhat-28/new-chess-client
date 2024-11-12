import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import ShopItem from "../../components/ShopItem";
import ShopItemDetailModal from "../../components/ShopItemDetailModal";
import { IPurchasableItem } from "../../interfaces";

const ShopPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const mockShopItem: IPurchasableItem[] = [
        {
            id: 1,
            name: "Theme A",
            type: "theme",
            detail: "A color theme for your web app",
            price: 1,
        },
        {
            id: 2,
            name: "Theme B",
            type: "theme",
            detail: "A color theme for your web app",
            price: 1,
        },
        {
            id: 3,
            name: "Theme C",
            type: "theme",
            detail: "A color theme for your web app",
            price: 1,
        },
        {
            id: 4,
            name: "Theme D",
            type: "theme",
            detail: "A color theme for your web app",
            price: 1,
        },
        {
            id: 5,
            name: "Skin A",
            type: "skin",
            detail: "A skin to customize your chessboard",
            price: 5,
        },
        {
            id: 6,
            name: "Skin B",
            type: "skin",
            detail: "A skin to customize your chessboard",
            price: 5,
        },
        {
            id: 7,
            name: "Skin C",
            type: "skin",
            detail: "A skin to customize your chessboard",
            price: 5,
        },
        {
            id: 8,
            name: "Merch",
            type: "other",
            detail: "A merch to support the creator",
            price: 10,
        },
        {
            id: 9,
            name: "Merch",
            type: "other",
            detail: "A merch to support the creator",
            price: 10,
        },
    ];

    return (
        <div className="page-content-wrapper">
            {mockShopItem.length === 0 && (
                <div className="h-full w-full flex flex-col items-center justify-center">
                    <FaShoppingCart size={"6rem"} color={"#111827"} />
                    <p className="text-gray-900 font-bold mt-2">
                        More items on sale soon
                    </p>
                </div>
            )}

            {loading && (
                <div className="h-full w-full flex flex-col items-center justify-center">
                    <HashLoader />
                </div>
            )}

            {mockShopItem.length > 0 && (
                <div className="page-preset overflow-y-scroll gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {mockShopItem.map((item) => (
                        <ShopItem key={item.id} data={item} />
                    ))}
                </div>
            )}

            <ShopItemDetailModal />
        </div>
    );
};

export default ShopPage;
