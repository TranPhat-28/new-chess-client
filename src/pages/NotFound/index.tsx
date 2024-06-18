import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen bg-orange-100 flex flex-col items-center justify-center">
            <img alt="not_found" src="/not_found.svg" />
            <button className="btn btn-primary" onClick={() => navigate("/")}>
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;
