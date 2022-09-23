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

export async function Tickets(token: string) {
  const uri: string = `https://api.movidesk.com/public/v1/tickets`;

  const token_ = "80c1fb64-3e4a-48c9-b105-160958e7f5c5";

  const statusList: string[] = [
    "S1.0 - SEPARAÇÃO ESTOQUE",
    "S4 - COLETA REVERSA",
    "S5.0 - ENTRADA ESTOQUE",
  ];

  //MODELOS DE URI

  // https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id,customFieldValues,createdDate,status&$orderby=id desc&$filter=status ne ' ' and status ne 'Resolvido' and createdDate gt 2022-09-05&$expand=customFieldValues($filter=customFieldId eq 92408;$select=value;$filter=value eq 'DWH6BK604J')&$top=1

  //RETORNANDO TODOS OS OS OBJT POREM APENAS MOSTRA O CUSTOMFIELDSVALUES DO SN DESEJADO
  //https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id,customFieldValues,createdDate,status&$orderby=id desc&$filter=status ne ' '&$expand=customFieldValues($filter=customFieldId eq 92408;$select=value;$filter=value eq 'ZOD5BMA0BH')

  //https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id,customFieldValues,createdDate,status&$orderby=id desc&$expand=customFieldValues($filter=customFieldId eq 92408;$select=value;$filter=value eq 'ZOD5BMA0BH')&$filter=status ne ' '

  const testeUri = `https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id&$filter=status eq 'S4 - COLETA REVERSA' &$expand=customFieldValues($filter=customFieldId eq 92408;$select=value)`;

  statusList.forEach(async (status: string) => {
    const uri = `https://api.movidesk.com/public/v1/tickets?token=80c1fb64-3e4a-48c9-b105-160958e7f5c5&$select=id&$filter=status eq '${status}' &$expand=customFieldValues($filter=customFieldId eq 92408;$select=value)`;

    const response = await axios.get(uri);
    const data = response.data;

    const dataFiltered = data.filter((value: any) => {
      const snToBeFound = "PKE4A40067";

      const [serialNumbers] = value.customFieldValues;

      //console.log(serialNumbers.value);

      if (snToBeFound === serialNumbers.value) {
        return value;
      }
    });

    dataFiltered[0] ? console.log(dataFiltered[0]) : false;

    //console.log(dataFiltered[0]);
  });
}
