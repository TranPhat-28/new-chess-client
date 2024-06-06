import { confirmAlert } from "react-confirm-alert";
import CustomConfirmAlert from "../components/CustomConfirmAlert";
import { ReactElement } from "react";

export const showCustomAlert = (
    title: string,
    content: string,
    confirmText?: string,
    confirmCallback?: () => void,
    img?: string,
    svg?: ReactElement,
    hideCancelButton?: boolean
) => {
    confirmAlert({
        overlayClassName: "bg-overlay-important",
        closeOnClickOutside: false,
        customUI: ({ onClose }) => {
            return (
                <CustomConfirmAlert
                    onClose={onClose}
                    title={title}
                    content={content}
                    confirmText={confirmText}
                    confirmCallback={confirmCallback}
                    img={img}
                    svg={svg}
                    hideCancelButton={hideCancelButton}
                />
            );
        },
    });
};
