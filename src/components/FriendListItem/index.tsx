const FriendListItem = () => {
    return (
        <div className="collapse bg-base-200 rounded-lg shadow-md flex-shrink-0">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium flex justify-between p-4">
                <p>Friend</p>
                <div className="flex gap-2 items-center">
                    <span className="text-sm font-normal text-gray-500">Online</span>
                    <i className="block h-3 w-3 bg-green-500 rounded-full"/>
                </div>
            </div>
            <div className="collapse-content flex gap-2">
                <button className="btn btn-primary btn-outline">View profile</button>
                <button className="btn btn-error">Delete friend</button>
            </div>
        </div>
    );
};

export default FriendListItem;
