import { Consumer } from "./Consumer";

export interface Product {

    id: number,
    shortLabel: string,
    price: number,
    reference: string,
    consumer: Consumer[]
}