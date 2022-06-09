import { Consumer } from "./Consumer";
import { Product } from "./Product";

export interface Command {

    id: number,
    reference: string,
    status: number,
    consumer: Consumer,
    products: Product[],

}