import { Consumer } from "./Consumer";

export interface Outlay {
    idOutlay: number,
    status: string,
    price: number,
    type: string,
    description: string,
    consumer: Consumer
}