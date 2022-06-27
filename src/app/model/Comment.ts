import { Holiday } from "./Holiday";
import { Outlay } from "./Outlay";

export interface Command {

    id: number,
    description: string,
    holiday: Holiday,
    outlay: Outlay,
}
