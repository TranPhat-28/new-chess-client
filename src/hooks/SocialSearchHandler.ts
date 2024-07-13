import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { RootState } from "../redux/store";
import { ISearchProfileResult } from "../interfaces";

const useDebouncedSearch = (initialValue = "", delay = 500) => {
    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    const [searchValue, setSearchValue] = useState<string>(initialValue);
    const [debouncedSearch] = useDebounce(searchValue, delay);
    const [searchResult, setSearchResult] =
        useState<ISearchProfileResult | "" | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (debouncedSearch !== "") {
            setLoading(true);
            axios
                .post(
                    "/api/Social/Search",
                    {
                        socialId: debouncedSearch,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(function (response) {
                    // Response 200
                    setSearchResult(response.data.data);
                })
                .catch(function (error) {
                    toast.error(error.response.statusText);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [debouncedSearch]); // Runs when debouncedSearch changes

    return { searchValue, setSearchValue, searchResult, loading };
};

export default useDebouncedSearch;
