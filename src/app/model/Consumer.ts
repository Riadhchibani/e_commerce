import { Product } from "./Product";

export class Consumer {

    constructor(
        private id: number,
        private firstName: string,
        private lastName: number,
        private email: string,
        private mobileNumber: string,
        private username: string,
        private password: string,
        private products: Product[],
    ) { }

    public get _username() {
        return this.username; 
    }

    public set _username(username: string) {
        this.username = username;
    }

    public get _password() {
        return this.password; 
    }

    public set _password(password: string) {
        this.password = password;
    }

}