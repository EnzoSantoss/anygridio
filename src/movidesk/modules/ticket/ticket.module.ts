import Ticket from "../../class/ticket/data.class";
import { TicketData } from "../../interface/ticket/ticket.interface";


export default function ticket(id: number, token: string): Ticket {
    let data: TicketData;
    return new Ticket(data);
}