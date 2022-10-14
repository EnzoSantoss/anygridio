//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";
import { arrayStatus } from "../../class/ticket/defalutFields";
import { queryBuilder } from "../../../utils/queryBuilder";
import { factory } from "../../../utils/factory";

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
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;

    //Construindo a query com todos os filtros Necessários
    let { query } = queryBuilder(info, operator, token);

    //Montando a url que sera consumida pelo axios
    const url = `${uri}?${query}`;

    const response: any = await axios.get(url);

    const data: I.Ticket[] = response.data;

    //Jogando os valores retornados da API para dentro da factory function
    const buildTicket = factory(data);

    //O valor retornado sera um ticket pronto, com todas as propriedades e funções da classe Ticket

    return buildTicket;
  } catch (e) {
    console.log("Erro: " + e);
    return;
  }
}
