import { Consumer } from "./Consumer";

export interface Holiday {

    idHoliday: number,
    numberDay: number,
    description: string,
    status: string,
    consumerAdmin: Consumer,
    consumerDemand: Consumer

}
