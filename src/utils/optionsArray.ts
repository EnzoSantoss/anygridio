import { statusCheck } from "./statusCheck";
import { Tickets } from "../movidesk/interface";
export function optionsValues(info: any) {
  let optionsValues: string = "";
  let name: any = null;
  let existeOption: boolean = false;

  info.forEach((e: Tickets) => {
    if (e.options) {
      existeOption = true;
      name = e?.name ?? e.id;
      let objt = e.options;

      //Fazendo um looping pelas propriedades do objeto
      Object.keys(objt).forEach((e, index) => {
        const value = statusCheck(name, objt[e]);
        optionsValues +=
          index == 0
            ? `&$filter=${name} eq '${value}'`
            : ` or ${name} eq '${value}'`;
        //arrayValues?.push(value);
      });
    }
  });

  if (!existeOption) {
    return false;
  } else {
    return optionsValues;
  }
}
