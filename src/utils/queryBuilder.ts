import * as I from "../movidesk/interface/index";
import { statusCheck } from "./statusCheck";
import { optionsValues } from "./optionsArray";
import { rangeValues } from "./rangeValues";
//import test from "node:test";
let skipAmount: any;

export function queryBuilder(
  info: I.Tickets[],
  operator: string,
  token: string,
  anygridOnly: boolean,
  skip?: boolean
) {
  //const [infoTickets]: I.Tickets[] = info;
  const select: string = `$select=id,status,owner,tags,urgency,justification,serviceFirstLevel,category,createdDate`;
  const expand: string = `$expand=clients,owner,customFieldValues`;
  const query_Inside_Expand: string = `$select=value,customFieldId,customFieldRuleId,line,items;$expand=items`;
  let filters: any = null;
  let query: string | null = null;
  let existRange: boolean = false;
  let onceInRange: boolean = false;
  //let skipAmount: any;

  ////////////////////////////////////////////////////////////////////

  let options; // optionsValues(info);
  existRange = rangeValues(info, anygridOnly).existRange;

  ////////////////////////////////////////////////////////////////////

  // if (true) {
  const operation = operator.toLowerCase();

  info.forEach((e, index) => {
    //Fazendo um looping por todos os itens que foram passados e montando um filtro
    if (!e.name && !e.id) {
      //-Se o parametro "name" e "id" NÃO forem passados, a função ira usar essa query para fazer a pesquisa na api do movidesk
      //-Essa query retornara qualquer ticket que tiver um valor DENTRO customFieldValue igual ao parametro que for passado na função
      //-Exemplo: se o parametro passado for um numero de serie igual a 'DWH3BDB00C',essa query irá retornar todos os tickets com o numero de serie igual a 'DWH3BDB00C'
      index == 0
        ? (filters = `&$filter=customFieldValues/any(c: c/value eq '${e.value}')`)
        : (filters += ` ${operation} customFieldValues/any(c: c/value eq '${e.value}')`);
    } else if (e.name) {
      //-Se o parametro "name" FOR passado, a função ira usar esse parametro para fazer um filtro na requisição da API
      //-Essa query retornara qualquer ticket que tiver um valor condizente com o nome passado
      //-Exemplo: se o parametro name for igual a "status", o parametro value necessariamente precisara ser algum status existente, como por exemplo value = "S4 - COLETA REVERSA"
      if (existRange && !onceInRange) {
        let values = rangeValues(info, anygridOnly);

        filters = values.filters;
        onceInRange = true;

        //console.log(filters);
      } else {
        index == 0
          ? (filters = `&$filter=${e.name} eq '${statusCheck(
              e.name,
              e.value
            )}'`)
          : (filters += ` ${operation} ${e.name} eq '${statusCheck(
              e.name,
              e.value
            )}'`);
      }
    } else {
      //-Por fim,caso o parametro "id" FOR passado, a função ira usar esse parametro para fazer um filtro na requisição da API
      //-Essa query retornara qualquer ticket que tiver o "value" dentro do customFieldId desejado
      //-Exemplo: se o parametro id for igual a "92408",e o parametro value igual a "DXH5BG90NY", ele ira pesquisar qual ticket possui esse valor nesse id em especifico
      index == 0
        ? (filters = `&$filter=customFieldValues/any(c: c/value eq '${e.value}'  and  c/customFieldId eq ${e.id})`)
        : (filters += ` ${operation} customFieldValues/any(c: c/value eq '${e.value}'  and  c/customFieldId eq ${e.id})`);
    }
  });

  if (filters) {
    query = `token=${token}&${select}&${expand}(${query_Inside_Expand})${filters}&$orderby=id desc`;
  }

  if (skip) {
    //Verificando se a opção skip foi passada e quantos tickets vão precisar ser skipados
    skipAmount == null
      ? ((query = `token=${token}&${select}&${expand}(${query_Inside_Expand})${filters}&$orderby=id desc&$skip=1000`),
        (skipAmount = 2))
      : (query = `token=${token}&${select}&${expand}(${query_Inside_Expand})${filters}&$orderby=id desc&$skip=${skipAmount}000`);

    skipAmount = skipAmount + 1 - 1;

    return query;
  }

  // }
  if (options) {
    console.log(options);
    query = `token=${token}&${select}&${expand}(${query_Inside_Expand})${options}&$orderby=id desc`;

    return query;
  }

  return query;
}
