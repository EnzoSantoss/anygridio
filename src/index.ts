//Arquivo responsavel por exportar todas as funções para "fora" do package, ou seja, funções que serão executadas quando alguem baixar essa dependencia

// export * from './braspress/index';
//export * from "./movidesk/index";
// export * from './nfe/index';

//import { Ticket, Tickets } from "./movidesk/index"; // Testando as funções localmente via npm run dev
//export { Ticket, Tickets } from "./movidesk/index"; // exportando as funcionalidades do package

import { Movidesk } from "./movidesk";
export { Movidesk } from "./movidesk";

const create = async () => {
  // const ticket_ = await Movidesk.Ticket(
  //   38261,
  //   "80c1fb64-3e4a-48c9-b105-160958e7f5c5"
  // );

  // const [tkt] = ticket_;

  // tkt.withFields("default")

  /////////////////////////////////////////////////////////////////

  const tickets_ = await Movidesk.Tickets(
    [
      { id: 92408, value: "DXH5BG90NY" },
      { name: "status", value: "s8" },
      { value: "79904354" },
    ],
    "80c1fb64-3e4a-48c9-b105-160958e7f5c5",
    "and"
  );

  const [teste]: any = tickets_;

  console.log(teste.id);

  console.log("-------FINAL DO PROCESSO--------");
  return tickets_;
};

create();
