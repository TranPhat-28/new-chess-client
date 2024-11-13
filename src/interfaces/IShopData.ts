export interface IPurchasableItem {
    id: number;
    name: string;
    type: "theme" | "skin" | "other";
    detail: string;
    price: number;
}
