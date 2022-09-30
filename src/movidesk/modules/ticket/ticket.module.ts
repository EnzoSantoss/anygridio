//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";

async function factory(ticket: any, token?: string) {
  //Verificando se é um array de tickets  ou se é um unico tickets
  if (Array.isArray(ticket)) {
    const ticketsArray = ticket.map(async (id) => {
      const url = `https://api.movidesk.com/public/v1/tickets?token=${token}&id=${id}`;
      const response = await axios.get(url);
      const data = response.data;
      const buildTicket = new Ticket(
        data.id,
        data.status,
        data.category,
        data.customFieldValues
      );
      return buildTicket;
    });

    return ticketsArray;
  } else {
    const buildTicket = new Ticket(
      ticket.id,
      ticket.status,
      ticket.category,
      ticket.customFieldValues
    );
    return buildTicket;
  }
}

export async function ticket(id: number, token: string) {
  //let tkt = await buildClassTicket(id, token);
  try {
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;
    const query: string = `token=${token}&id=${id}`;
    const url: string = `${uri}?${query}`;
    const response: any = await axios.get(url);
    const t: I.Ticket = response.data;
    return factory(t);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function Tickets(info: I.Tickets, token: string) {
  const uri: string = `https://api.movidesk.com/public/v1/tickets`;

  //Pesquisando o ticket pelo numero de serie informado
  const query: string = `token=${token}&$select=id,status,createdDate&$expand=customFieldValues($filter=customFieldId eq ${info.customFieldId};$select=value,customFieldId)&$filter=customFieldValues/any(c: c/value eq '${info.serialNumber}')`;

  const url = `${uri}?${query}`;

  const response: any = await axios.get(url);

  const data: I.TicketsData[] = response.data;

  //pegando o ID de todos os tickets
  const ticketsId: number[] = data.map((tkt) => {
    return tkt.id;
  });
  const teste: any = await factory(ticketsId, token);
  return teste;
}
