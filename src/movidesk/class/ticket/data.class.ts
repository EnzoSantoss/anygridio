import { TicketData } from "../../interface/ticket/ticket.interface";

export default class Ticket {
    constructor (
        public readonly data: TicketData
    ) {

    }
}