import { Product } from "./Product";

export interface Consumer {

    id: number,
    firstName: string,
    lastName: number,
    email: string,
    mobileNumber: string,
    username: string,
    password: string,
    role: string;
    products: Product[],

}