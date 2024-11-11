import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import ShopItem from "../../components/ShopItem";

const ShopPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const mockShopItem = [1, 1, 1, 2, 2, 2, 2, 3, 3];

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
                <div className="page-preset overflow-y-scroll gap-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {mockShopItem.map((item, index) => (
                        <ShopItem key={index} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;