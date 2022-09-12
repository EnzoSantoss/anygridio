import {Ticket} from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from 'axios';

export default async function ticket(id: number, token: string) {
    try {
        const uri: string = `https://api.movidesk.com/public/v1/ticket`;
        const query: string = `token=${token}&id=${id}`;
        const url: string = `${uri}?${query}`;
        const response: any = await axios.get(url);
        const t: I.Ticket = response.data;
        const ticket = new Ticket(
            t.id,
            t.status,
            t.category,
            t.customFieldValues
        );
        return ticket;
    } catch (e: any) {
        throw new Error(e);
    }
}