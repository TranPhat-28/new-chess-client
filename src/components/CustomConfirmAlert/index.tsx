import { ICustomConfirmAlertProps } from "../../interfaces";

const CustomConfirmAlert = ({
    onClose,
    title,
    content,
    img,
    svg,
    confirmText,
    confirmCallback,
    hideCancelButton = false,
}: ICustomConfirmAlertProps) => {
    return (
        <div className="bg-base-100 p-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg">
            {svg && (
                <div className="w-full flex justify-center py-2">{svg}</div>
            )}
            <h3 className="font-bold text-lg">{title}</h3>
            {img && <img src={img} />}
            <p className="py-2">{content}</p>

            <div className="float-right">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (confirmCallback) {
                            confirmCallback();
                        }
                        onClose();
                    }}
                >
                    {confirmText}
                </button>
                {!hideCancelButton && (
                    <button
                        className="btn ml-2"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomConfirmAlert;
