import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setLoadingMessage } from "../redux/features/loadingSlice";

export const showLoading = (
    dispatch: Dispatch<UnknownAction>,
    message: string
) => {
    dispatch(setLoadingMessage(message));
    const loading = document.getElementById("loading") as HTMLDialogElement;
    loading.showModal();
};

export const hideLoading = () => {
    const loading = document.getElementById("loading") as HTMLDialogElement;
    loading.close();
};
