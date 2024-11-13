export interface ITokenData {
    email: string;
    exp: number;
    iat: number;
    nameid: string;
    nbf: number;
    unique_name: string;
}

export interface IAuthData {
    email: string | null;
    token: string | null;
}
