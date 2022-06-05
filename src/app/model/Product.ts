import { Consumer } from "./Consumer";

export class Product {

    constructor(
        public id?: number,
        public shortLabel?: string,
        public price?: number,
        public reference?: string,
        public consumer?: Consumer[]
    ) { }
}