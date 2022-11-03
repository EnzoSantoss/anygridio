import { statusCheck } from "./statusCheck";
import { Tickets } from "../movidesk/interface";

export function rangeValues(info: any, anygridOnly: boolean) {
  let filters: string = "";
  let name: any = null;
  let existRange: boolean = false;

  info.forEach((e: Tickets, index: number) => {
    if (e.range) {
      existRange = true;
      name = e?.name ?? e.id;
      //Desestruturando o objeto range
      const { from, to } = e.range;

      //console.log(`Pegando Tickets de: ${from} até: ${to} `);
      if (name !== "data") {
        //console.log("outro filtro alem de data");
      } else {
        name = "createdDate";
        if (anygridOnly === true) {
          //Filtrando APENAS pelos tickets que estão no fluxo DENTRO DE GARANTIA ou FORA DE GARANTIA
          index == 0
            ? (filters = `&$filter=createdDate ge ${from} and createdDate le ${to} and startswith(status, 'S' ) or createdDate ge ${from} and createdDate le ${to} and startswith(status, 'F' )`)
            : (filters += ` createdDate ge ${from} and createdDate le ${to} and startswith(status, 'S' ) or createdDate ge ${from} and createdDate le ${to} and startswith(status, 'F' )`);
        } else {
          //Filtrando TODOS os tickets
          index == 0
            ? (filters = `&$filter=createdDate ge ${from} and createdDate le ${to} `)
            : (filters += ` createdDate ge ${from} and createdDate le ${to}`);
        }
      }
    }
  });

  if (!existRange) {
    return { existRange };
  } else {
    return { name, filters, existRange };
  }
}

//`&$filter=createdDate ge ${from} and createdDate le ${to} and startswith(status, 'S') or startswith(status, 'F') and status ne 'Fechado'`)
