//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";
import { arrayStatus } from "../../class/ticket/defalutFields";
//import queryBuilder from "../../../utils/queryBuilder"
import { queryBuilder } from "../../../utils/queryBuilder";

function factory(ticket: I.Ticket[] | I.Ticket, token?: string) {
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
      //Iniciando o processo de contrução do ticket
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

//Tickets Function
export async function Tickets(
  info: I.Tickets[],
  token: string,
  operator: string = "AND"
) {
  try {
    const [infoTickets]: I.Tickets[] = info;
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;
    const select: string = `$select=id,status,category,createdDate`;
    const expand: string = `$expand=customFieldValues`;
    const query_Inside_Expand: string = `$select=value,customFieldId,customFieldRuleId,line,items;$expand=items`;
    //let filters: null | string = null;
    //let query: string | null = null;

    let { query, filters } = queryBuilder(info, token);

    // if (filters) {
    //   query = `token=${token}&${select},createdDate&${expand}(${query_Inside_Expand})${filters}`;
    // }

    //Montando a url que sera consumida pelo axios

    const url = `${uri}?${query}`;

    const response: any = await axios.get(url);
    //const response: any = await fetch(url);

    const data: I.Ticket[] = response.data;

    //Jogando os valores retornados da API para dentro da factory function
    const buildTicket = factory(data);

    //O valor retornado sera um ticket pronto, com todas as propriedades e funções da classe Ticket
    //
    return buildTicket;
  } catch (e) {
    console.log("Erro: " + e);
    return;
  }
}
