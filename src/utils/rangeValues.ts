import { statusCheck } from "./statusCheck";
import { Tickets } from "../movidesk/interface";

export function rangeValues(info: any) {
  let values: string = "";
  let name: any = null;
  let existeRange: boolean = false;

  info.forEach((e: Tickets, index: number) => {
    if (e.range) {
      existeRange = true;
      name = e?.name ?? e.id;
      //Desestruturando o objeto range
      const { from, to } = e.range;

      console.log(`Pegando Tickets de: ${from} até: ${to} `);
      if (name !== "data") {
        values = `&$filter=${name} ge ${from} and createdDate le ${to}`;
      } else {
        name = "createdDate";
        //Filtrando APENAS pelos tickets que estão no fluxo DENTRO DE GARANTIA ou FORA DE GARANTIA
        values = `&$filter=createdDate ge ${from} and createdDate le ${to} and startswith(status, 'S') or startswith(status, 'F') and status ne 'Fechado'`;
      }
    }
  });

  if (!existeRange) {
    return false;
  } else {
    return { name, values };
  }
}
