const ShopItem = ({ data }: { data: any }) => {
    return (
        <div className="w-full h-fit bg-base-200 p-3 rounded-lg flex gap-2">
            <img src="https://picsum.photos/200" alt="item" className="w-36" />
            <div className="w-full flex flex-col justify-between">
                <div>
                    <p className="font-bold text-lg">Title</p>
                    {data === 1 && (
                        <div className="badge badge-primary badge-outline">
                            Theme
                        </div>
                    )}

                    {data === 2 && (
                        <div className="badge badge-secondary badge-outline">
                            Skin
                        </div>
                    )}

                    {data === 3 && (
                        <div className="badge badge-info badge-outline">
                            Others
                        </div>
                    )}
                </div>

                <button className="btn btn-primary self-end">View</button>
            </div>
        </div>
    );
};

export default ShopItem;
