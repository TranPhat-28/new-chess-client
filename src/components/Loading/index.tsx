import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { RootState } from "../../redux/store";

const Loading = () => {
    const loadingMessage = useSelector(
        (state: RootState) => state.loading.message
    );

    return (
        <dialog id="loading" className="modal">
            <div className="modal-box max-w-xs">
                <h3 className="font-bold text-xl text-center">
                    {loadingMessage}
                </h3>
                <div className="flex justify-center pt-4">
                    <HashLoader />
                </div>
            </div>
        </dialog>
    );
};

export default Loading;
