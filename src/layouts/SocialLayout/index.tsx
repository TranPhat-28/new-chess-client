import { Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";
import SearchResultItem from "../../components/SearchResultItem";
import useDebouncedSearch from "../../hooks/SocialSearchHandler";

const SocialLayout = () => {
    // Debounce search
    const { searchValue, setSearchValue, searchResult, loading } =
        useDebouncedSearch(); // Adjust delay as needed

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col lg:flex-row justify-center items-center overflow-hidden">
                {/* Search result list */}
                <div className="h-3/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Search for players
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {/* Loading */}
                        {loading && (
                            <div className="w-full h-full flex justify-center items-center">
                                <HashLoader />
                            </div>
                        )}

                        {/* No result */}
                        {searchResult === null && loading !== true && (
                            <div className="w-full h-full flex justify-center items-center text-red-400">
                                Cannot found player
                            </div>
                        )}

                        {/* Result */}
                        {searchResult !== "" && searchResult !== null && loading !== true && (
                            <SearchResultItem result={searchResult} />
                        )}
                    </div>

                    <div className="join w-full rounded-t-none">
                        <input
                            className="input input-bordered join-item w-full"
                            placeholder="Social Id or Name"
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <select className="select select-bordered join-item rounded-t-none">
                            <option>Social ID</option>
                            <option disabled>Name</option>
                        </select>
                    </div>
                </div>

                {/* Profile */}
                <Outlet />
            </div>
        </div>
    );
};

export default SocialLayout;
