import { Ticket } from "../../class/ticket/Ticket.class";
import * as I from "../../interface/index";
import axios from "axios";

// export default async function ticket(id: number, token: string) {
//   try {
//     const uri: string = `https://api.movidesk.com/public/v1/tickets`;
//     // const query: string = `token=${token}&id=${id}`;
//     const query: string = `token=${token}&id=${id}`;
//     const url: string = `${uri}?${query}`;
//     const response: any = await axios.get(url);
//     const t: I.Ticket = response.data;
//     const ticket = new Ticket(t.id, t.status, t.category, t.customFieldValues);
//     return ticket;
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

const buildClassTicket = async (id: number, token: string) => {
  try {
    const uri: string = `https://api.movidesk.com/public/v1/tickets`;
    // const query: string = `token=${token}&id=${id}`;
    const query: string = `token=${token}&id=${id}`;
    const url: string = `${uri}?${query}`;
    const response: any = await axios.get(url);
    const t: I.Ticket = response.data;
    const ticket = new Ticket(t.id, t.status, t.category, t.customFieldValues);
    return ticket;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default async function ticket(id: number, token: string) {
  let tkt = await buildClassTicket(id, token);

  return tkt;

  // let tktPromise = new Promise((resolve, reject) => {
  //   //let newTktk = buildClassTicket(id, token);
  //   if (tkt) {
  //     resolve(tkt);
  //   } else {
  //     reject("Failed");
  //   }
  // });

  // return tktPromise
  //   .then((t) => {
  //     return t;
  //   })
  //   .catch((message) => {
  //     return message;
  //   });
  // let tkt = Promise.resolve()
}
