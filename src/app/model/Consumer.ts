import { Product } from "./Product";

export class Consumer {

    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: number,
        public email?: string,
        public mobileNumber?: string,
        public products?: Product[]
    ) { }
}