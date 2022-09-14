// export * from './braspress/index';
// export * from './movidesk/index';
// export * from './nfe/index';

import { ticket } from "./movidesk/modules";

const create = async () => {
  const testetck = await ticket(37856, "80c1fb64-3e4a-48c9-b105-160958e7f5c5");
  //testetck.getProcedure(testetck.status);
  testetck.withFields("default");
};

create();

// console.log(ticketTeste);
