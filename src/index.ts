// export * from './braspress/index';
//export * from "./movidesk/index";
// export * from './nfe/index';

import { ticket } from "./movidesk/modules";
export { ticket } from "./movidesk/modules";

//import * as ticket from "./movidesk/index"

const create = async () => {
  const teste = (
    await ticket(37856, "80c1fb64-3e4a-48c9-b105-160958e7f5c5")
  ).withFields("default");

  console.log(teste);
};

create();

console.log("Testing Build");

//   teste.getProcedure(teste.status);
//   teste.withFields("default");
//   const testeinvoice = teste.getInvoice(teste.status, "dg", teste.fields);
