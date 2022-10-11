//Arquivo responsavel por criar todos os recursos do package Anygridio relacionados aos tickets
import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";
import { arrayStatus } from "../../class/ticket/defalutFields";

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
    let filters: null | string = null;
    let query: string | null = null;
    //Verinfando se o array que esta vindo da função só possui um item
    if (info.length <= 1) {
      //Pesquisando o(s) ticket(s) de acordo com as informações solicitadas
      if (!infoTickets.name && !infoTickets.id) {
        //-Se o parametro "name" e "id" NÃO forem passados, a função ira usar essa query para fazer a pesquisa na api do movidesk
        //-Essa query retornara qualquer ticket que tiver um valor DENTRO customFieldValue igual ao parametro que for passado na função
        //-Exemplo: se o parametro passado for um numero de serie igual a 'DWH3BDB00C',essa query irá retornar todos os tickets com o numero de serie igual a 'DWH3BDB00C'

        query = `token=${token}&${select},createdDate&${expand}(${query_Inside_Expand})&$filter=customFieldValues/any(c: c/value eq '${infoTickets.value}')`;
      } else if (infoTickets.name || infoTickets.id) {
        //-Se o parametro "name" OU "id" FOR passado, a função ira usar esses parametros para fazer um filtro na requisição da API
        //-Essa query retornara qualquer ticket que tiver um valor condizente com o nome passado
        //-Exemplo: se o parametro name for igual a "status", o parametro value necessariamente precisara ser algum status existente, como por exemplo value = "S4 - COLETA REVERSA"

        if (infoTickets.name == "status") {
          const [statusFiltered]: string[] = arrayStatus.filter((value) => {
            const infoValueUpperCase = infoTickets.value.toLocaleUpperCase();
            if (value.startsWith(infoValueUpperCase)) {
              return value;
            }
          });

          console.log(statusFiltered);

          query = `token=${token}&${select}&$filter=${infoTickets.name} eq '${statusFiltered}'&${expand}(${query_Inside_Expand})&$orderby=id desc`;
        } else if (
          //typeof infoTickets.name == "number" ||
          typeof infoTickets.id == "number"
        ) {
          query = `token=${token}&${select},createdDate&${expand}(${query_Inside_Expand})&$filter=customFieldValues/any(c: c/value eq '${infoTickets.value}' and c/customFieldId eq ${infoTickets.id})&$orderby=id desc`;
        } else {
          query = `token=${token}&${select}&$filter=${infoTickets.name} eq '${infoTickets.value}'&${expand}(${query_Inside_Expand})&$orderby=id desc`;
        }
      }
    } else {
      //Caso for passado mais de um item no array
      info.forEach((e, index) => {
        //Fazendo um looping por todos os itens que foram passados e moentando um filtro
        if (!e.name) {
          index == 0
            ? (filters = `&$filter=customFieldValues/any(c: c/value eq '${e.value}'  and  c/customFieldId eq ${e.id})`)
            : (filters += ` and customFieldValues/any(c: c/value eq '${e.value}'  and  c/customFieldId eq ${e.id})`);
        } else {
          index == 0
            ? (filters = `&$filter=${e.name} eq '${e.value}'`)
            : (filters += `and ${e.name} eq '${e.value}'`);
        }
      });
    }

    console.log(filters);

    if (filters) {
      query = `token=${token}&${select},createdDate&${expand}(${query_Inside_Expand})${filters}`;
    }

    //Montando a url que sera consumida pelo axios

    const url = `${uri}?${query}`;

    const response: any = await axios.get(url);
    //const response: any = await fetch(url);

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

//https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id&$filter=status eq 'S4 - COLETA REVERSA'&$expand=customFieldValues($filter=customFieldId eq 116884;$select=value)

// const query: string = `token=${token}&$select=id,status,category&$expand=customFieldValues($select=value,customFieldId,customFieldRuleId,line,items;$expand=items)&$filter=customFieldValues/any(c: c/value eq '${info.serialNumber}')`;
