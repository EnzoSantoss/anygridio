import { statusCheck } from "./statusCheck";
import { Tickets } from "../movidesk/interface";
export function optionsArrayValues(info: any) {
  let arrayValues: string[] = [];
  let name: any = null;

  info.forEach((e: Tickets) => {
    if (e.options) {
      name = e?.name ?? e.id;
      let objt = e.options;

      //Fazendo um looping pelas propriedades do objeto
      Object.keys(objt).forEach((e) => {
        const value = statusCheck(name, objt[e]);
        arrayValues?.push(value);
      });
    }
  });

  if (arrayValues.length == 0) {
    return false;
  } else {
    return { name, arrayValues };
  }

  //arrayValues.length == 0 ? return false : return
  //? return false :return arrayValues
}
