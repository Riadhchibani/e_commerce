import { Command } from "./Command";
import { Consumer } from "./Consumer";
import { Holiday } from "./Holiday";
import { Outlay } from "./Outlay";

export interface Comment {

    id: number,
    description: string,
    holiday: Holiday,
    outlay: Outlay,
    command: Command
}
