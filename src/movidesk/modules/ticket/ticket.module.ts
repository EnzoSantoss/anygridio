//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";

const buildClassTicket = async (id: number, token: string) => {
  try {
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;
    // const query: string = `token=${token}&id=${id}`;
    const query: string = `token=${token}&id=${id}`;
    const url: string = `${uri}?${query}`;
    const response: any = await axios.get(url);
    const t: I.Ticket = response.data;
    const ticket = new Ticket(t.id, t.status, t.category, t.customFieldValues);
    return ticket;
  } catch (e: any) {
    throw new Error(e);
  }
};

export async function ticket(id: number, token: string) {
  let tkt = await buildClassTicket(id, token);

  return tkt;
}

export async function Tickets(info: I.Tickets, token: string) {
  const uri: string = `https://api.movidesk.com/public/v1/tickets`;

  const query: string = `token=${token}&$select=id,status,createdDate&$expand=customFieldValues($filter=customFieldId eq ${info.customFieldId};$select=value,customFieldId)&$filter=customFieldValues/any(c: c/value eq '${info.serialNumber}')`;

  const url = `${uri}?${query}`;

  const response: any = await axios.get(url);

  // const [data]: {
  //   createdDate: string;
  //   status: string;
  //   id: number;
  //   customFieldValues: any[];
  // }[] = response.data;

  const [data]: I.TicketsData[] = response.data;

  return data;

  //console.log(customFieldValuesOBJT.customFieldValues[0]);
}
