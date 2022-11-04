import * as I from "../movidesk/interface/index";
import { Ticket } from "../movidesk/class/ticket/Ticket.class";

export function factory(ticket: I.Ticket[] | I.Ticket, token?: string) {
  function ticketBuilder(value: any) {
    return new Ticket(
      value.id,
      value.status,
      value.category,
      value.customFieldValues,
      value.clients,
      value.createdDate,
      value?.urgency,
      value?.owner,
      value?.serviceFirstLevel,
      value?.justification,
      value?.tags
    );
  }

  //Verificando se é um array de tickets  ou se é um unico tickets
  if (Array.isArray(ticket)) {
    const ticketsArray = ticket.map((value) => {
      //Iniciando o processo de contrução do ticket
      const buildTicket = ticketBuilder(value);
      return buildTicket;
    });

    return ticketsArray;
  } else {
    const buildTicket = ticketBuilder(ticket);
    return [buildTicket];
  }
}
