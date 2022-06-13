import { Consumer } from "./Consumer";
import { Product } from "./Product";

export interface Command {

    id: number,
    reference: string,
    status: string,
    consumer: Consumer,
    products: Product[],
    qte: number
}
