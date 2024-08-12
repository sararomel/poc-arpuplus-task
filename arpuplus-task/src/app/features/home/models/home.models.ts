export interface HomeGetResponse {
    pageSize: number;
    pageNumber: number;
    customers: CustomerGetResponse[];
    columns: any;
    count: number
}
export interface CustomerGetResponse {

}
export interface ProductGetResponse {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}