//Arquivo responsavel por exportar todas as funções para "fora" do package, ou seja, funções que serão executadas quando alguem baixar essa dependencia

// export * from './braspress/index';
//export * from "./movidesk/index";
// export * from './nfe/index';

//import { Ticket, Tickets } from "./movidesk/index"; // Testando as funções localmente via npm run dev
//export { Ticket, Tickets } from "./movidesk/index"; // exportando as funcionalidades do package

import { Movidesk } from "./movidesk";
export { Movidesk } from "./movidesk";

const create = async () => {
  // const [ticket_] = await Movidesk.Ticket(
  //   38261,
  //   "80c1fb64-3e4a-48c9-b105-160958e7f5c5"
  // );

  // //const [tkt] = ticket_;

  // ticket_.withFields([
  //   { id: 92408, value: "snDamaged" },
  //   { id: 103454, value: "snFixedAnygrid" },
  //   { id: 122405, value: "snFixedTha" },
  //   { id: 116301, value: "dateIngressIntoStock" },
  // ]);
  // console.log(ticket_);

  /////////////////////////////////////////////////////////////////

  const tickets_ = await Movidesk.Tickets(
    [
      //{ id: 92408, value: "DZH2B030BG" },
      //{ name: "category", value: "Fora da Garantia" },
      //{ name: "status", value: "s5" },
      //{ name: "status", options: { 0: "s2.1", 1: "s3" } },
      {
        name: "data",
        range: {
          from: "2022-10-01",
          to: "2022-10-07",
        },
      },
      //{ name: "status", value: "s5" },
      //{ id: 115201, value: "Growatt 3000TL-X" },
    ],
    "80c1fb64-3e4a-48c9-b105-160958e7f5c5",
    { anygridOnly: false }
    // true,
    // "and"
  );

  //const [teste]: any = tickets_;

  const [singleTKT]: any = tickets_;
  console.log(singleTKT);

  singleTKT.withFields([
    { id: 115201, value: "modelInverter" },
    { id: 92834, value: "distribuidor" },
    { id: 102777, value: "razao social" },
    { id: 102706, value: "cnpj empresa" },
    { id: 92893, value: "familia" },
    { id: 92993, value: "estado" },
    { id: 100121, value: "checkListCompleto" },
    { id: 104764, value: "checkListSimplificado" },
    { id: 100176, value: "VerificarConexõesInternas" },
  ]);

  console.log(singleTKT);

  //console.log(teste);
  // let count = 0;

  // tickets_?.forEach((e) => {
  //   //console.log(e.id);
  //   count += 1;
  // });

  // console.log(count);

  console.log("-------FINAL DO PROCESSO--------");
  return tickets_;
};

create();
