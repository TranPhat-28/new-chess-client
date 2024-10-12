import { jwtDecode } from "jwt-decode";
import { ITokenData } from "../interfaces";

export const GetAuthIdFromToken = (token: string): string => {
    if (token !== null) {
        const data: ITokenData = jwtDecode(token);
        return data.nameid;
    } else {
        return "";
    }
};
