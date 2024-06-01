import { HashLoader } from "react-spinners";

const InitialAlert = () => {
    return (
        <dialog id="initial_alert" className="modal modal-auto-gutter">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-xl text-center">
                    Game is starting up
                </h3>
                <div className="flex justify-center pt-4 mb-6">
                    <HashLoader />
                </div>
                <div role="alert" className="alert">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info shrink-0 w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>
                        New Chess uses a free deploying server and would take
                        some time on the first request. Thank you for being
                        patient.
                    </span>
                </div>
            </div>
        </dialog>
    );
};

export default InitialAlert;
