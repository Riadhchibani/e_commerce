import { Comment } from "./Comment";
import { Consumer } from "./Consumer";

export interface Holiday {

    idHoliday: number,
    beginDate?: Date,
    endDate?: Date,
    description: string,
    status: string,
    consumerAdmin: Consumer,
    consumerDemand: Consumer

}
