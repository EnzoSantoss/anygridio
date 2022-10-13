import { textSpanEnd } from "typescript";
import { arrayStatus } from "../movidesk/class/ticket/defalutFields";
import * as I from "../movidesk/interface/index";
import { statusCheck } from "./statusCheck";

export function queryBuilder(info: any[], token: string) {
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
        // const [statusFiltered]: string[] = arrayStatus.filter((value) => {
        //   const infoValueUpperCase = infoTickets.value.toLocaleUpperCase();
        //   if (value.startsWith(infoValueUpperCase)) {
        //     return value;
        //   }
        // });

        // console.log(statusFiltered);

        const statusFiltered = statusCheck(infoTickets.name, infoTickets.value);

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
          ? (filters = `&$filter=${e.name} eq '${statusCheck(
              e.name,
              e.value
            )}'`)
          : (filters += ` and ${e.name} eq '${statusCheck(e.name, e.value)}'`);
      }
    });
  }

  if (filters) {
    query = `token=${token}&${select},createdDate&${expand}(${query_Inside_Expand})${filters}`;
  }

  return { query, filters };
}
