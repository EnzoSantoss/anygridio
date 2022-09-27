//Arquivo responsavel por exportar todas as funções para "fora" do package, ou seja, funções que serão executadas quando alguem baixar essa dependencia

// export * from './braspress/index';
//export * from "./movidesk/index";
// export * from './nfe/index';

import { Ticket, Tickets } from "./movidesk/modules"; // Testando as funções localmente via npm run dev
export { Ticket } from "./movidesk/modules"; // exportando as funcionalidades do package

const create = async () => {
  // const ticket_ = await Ticket(36500, "80c1fb64-3e4a-48c9-b105-160958e7f5c5");
  // ticket_.withFields("default").getProcedure()?.getInvoice();
  // const teste = await Tickets({
  //   expand :
  // });

  const tickets_ = await Tickets(
    { customFieldId: 92408, serialNumber: "BKJ0BKD01N" },
    "80c1fb64-3e4a-48c9-b105-160958e7f5c5"
  );

  console.log(tickets_);
};

create();
