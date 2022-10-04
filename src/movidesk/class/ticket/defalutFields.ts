import { FieldsToFind } from "../../interface";

const defaultFields = {
  createInvoice: {
    defaultFields: [
      // Invoice
      { id: 105789, value: "urlOngoingInvoice" }, // PF e PJ
      { id: 105973, value: "idOngoingInvoice" }, // PF e PJ
      { id: 103435, value: "infoOngoingInvoice" }, // PF e PJ
      { id: 105790, value: "urlOutgoingInvoice" }, // PF e PJ
      { id: 105974, value: "idOutgoingInvoice" }, // PF e PJ
      { id: 115197, value: "infoOutgoingInvoice" }, // PF e PJ
      // Items
      { id: 92408, value: "ItemsDmgInverterSN" },
      { id: 106938, value: "ItemsDmgInverterDimension" }, // PF e PJ
      { id: 103454, value: "ItemsFixedInverterSN" }, // PF e PJ
      { id: 106440, value: "ItemsFixedInverterCondition" }, // PF e PJ
      // Buyer
      { id: 98338, value: "buyerType" }, // PF e PJ
      { id: 102707, value: "buyerCEP" }, // PF e PJ
      { id: 102756, value: "buyerAddress" }, // PF e PJ
      { id: 102754, value: "buyerNeighborhood" }, // PF e PJ
      { id: 102757, value: "buyerComplement" }, // PF e PJ
      { id: 102758, value: "buyerNumber" }, // PF e PJ
      { id: 102763, value: "buyerState" }, // PF e PJ
      { id: 102769, value: "buyerCity" }, // PF e PJ
      { id: 102755, value: "buyerCPF" }, // PF (Necessary beforehand to validations)
      { id: 102706, value: "buyerCNPJ" }, // PJ (Necessary beforehand to validations)
      // Delivery
      { id: 102928, value: "deliveryName" }, // PF e PJ
      { id: 107853, value: "deliveryCPF" }, // PF e PJ
      { id: 102774, value: "deliveryEmail" }, // PF e PJ
      { id: 102753, value: "deliveryPhone" }, // PF e PJ
      { id: 107835, value: "deliveryNeighborhood" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 107836, value: "deliveryCEP" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 107837, value: "deliveryCity" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 107838, value: "deliveryAddress" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 107852, value: "deliveryState" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 108037, value: "deliveryNumber" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
      { id: 108202, value: "deliveryComplement" }, // PF e PJ (Caso endereço de entrega difere endereço NF)]
    ],
    buyerTypeFields: {
      CPF: [{ id: 102776, value: "buyerName" }],
      PJ: [
        { id: 102777, value: "buyerName" },
        { id: 104205, value: "buyerICMS" },
        { id: 102929, value: "buyerStateTaxNumber" },
      ],
    },
  },
};

const arrayStatus: string[] = [
  "S0.1 - INFO ENVIO/COLETA (CLIENTE)",
  "S0.2 - INFO ENVIO/COLETA (SAC)",
  "S1.0 - SEPARAÇÃO ESTOQUE",
  "S1.ND.0 - ND",
  "S1.ND.1 - NF ENTRADA ND",
  "S1.ND.1.err - ERRO NF ENTRADA",
  "S2.1 - EMISSÃO NF DE ENTRADA",
  "S2.2 - EMISSÃO NF DE SAIDA",
  "S2.err.0 - NF ERRO",
  "S3.0 - IMPRIMIR NF E EMBALAR",
  "S3.1 - EXPEDIÇÃO",
  "S4 - COLETA REVERSA",
  "S5.0 - ENTRADA ESTOQUE",
  "S5.1 - ESTOQUE - AGUARDANDO LAB",
  "S6 - REPARO LABORATORIO",
  "S6.LIXO.1 - DESCARTAR INVERSOR",
  "S6.PEÇA.1 - AGUARDANDO PEÇA",
  "S6.PEÇA.2 REQUISIÇÃO DE PEÇA",
  "S7 - CONTROLE QUALIDADE",
  "S8 - DESTINO FINAL - ESTOQUE",
  "S8.1 - ARMAZENAGEM",
];

export { defaultFields, arrayStatus };
