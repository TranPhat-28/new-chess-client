import { ReactElement } from "react";

export interface ICustomConfirmAlertProps {
    onClose: () => void;
    title: string;
    content: string;
    img?: string;
    svg?: ReactElement;
    confirmText?: string;
    confirmCallback?: () => unknown;
    hideCancelButton?: boolean;
}
