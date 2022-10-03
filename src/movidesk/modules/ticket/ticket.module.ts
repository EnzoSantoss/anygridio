//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";

function factory(ticket: any, token?: string) {
  function ticketBuilder(value: any) {
    return new Ticket(
      value.id,
      value.status,
      value.category,
      value.customFieldValues
    );
  }

  //Verificando se é um array de tickets  ou se é um unico tickets
  if (Array.isArray(ticket)) {
    const ticketsArray = ticket.map((value) => {
      const buildTicket = ticketBuilder(value);
      return buildTicket;
    });

    return ticketsArray;
  } else {
    const buildTicket = ticketBuilder(ticket);
    return buildTicket;
  }
}

export async function ticket(id: number, token: string) {
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

//https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id&$filter=status eq 'S4 - COLETA REVERSA'&$expand=customFieldValues($filter=customFieldId eq 116884;$select=value)

// const query: string = `token=${token}&$select=id,status,category&$expand=customFieldValues($select=value,customFieldId,customFieldRuleId,line,items;$expand=items)&$filter=customFieldValues/any(c: c/value eq '${info.serialNumber}')`;

export async function Tickets(info: I.Tickets, token: string) {
  try {
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;
    const select: string = `$select=id,status,category,createdDate`;
    const expand: string = `$expand=customFieldValues`;
    let query: string | null = null;

    //Pesquisando o(s) ticket(s) de acordo com as informações solicitadas
    if (!info.name) {
      query = `token=${token}&$select=id,status,category,createdDate&$expand=customFieldValues($select=value,customFieldId,customFieldRuleId,line,items;$expand=items)&$filter=customFieldValues/any(c: c/value eq '${info.value}')`;
    } else if (info.name) {
      query = `token=${token}&$select=id,status,category&$filter=${info.name} eq '${info.value}'&$expand=customFieldValues($select=value,customFieldId,customFieldRuleId,line,items;$expand=items)&$orderby=id desc`;
    }

    const url = `${uri}?${query}`;

    const response: any = await axios.get(url);

    const data: I.TicketsData[] = response.data;

    const buildTicket: any = factory(data);

    return buildTicket;
  } catch (e) {
    console.log("Erro: " + e);
    return;
  }
}
