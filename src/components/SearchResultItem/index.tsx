import { IoPersonAdd } from "react-icons/io5";

const SearchResultItem = ({ result }: { result: string }) => {
    return (
        <div className="bg-base-200 rounded-lg shadow-md p-2 flex justify-between items-center">
            <p className="text-xl font-medium ml-2">{result}</p>
            <button className="btn btn-square btn-primary btn-outline">
                <IoPersonAdd />
            </button>
        </div>
    );
};

export default SearchResultItem;
