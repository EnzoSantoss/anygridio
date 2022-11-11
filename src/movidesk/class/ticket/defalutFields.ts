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
      //Modelos de invesores
      { id: 94154, value: "ARK" },
      { id: 94189, value: "GROHOME" },
      { id: 94184, value: "HOPE" },
      { id: 92894, value: "MAC" },
      { id: 93642, value: "MAX" },
      { id: 93713, value: "MIC" },
      { id: 93662, value: "MID" },
      { id: 93643, value: "MIN" },
      { id: 94155, value: "MOD" },
      { id: 93716, value: "Monitoramento" },
      { id: 93727, value: "MTLP_S" },
      { id: 93725, value: "MTL_S" },
      { id: 94188, value: "Outras_baterias" },
      { id: 93722, value: "S" },
      { id: 94178, value: "SC" },
      { id: 94156, value: "SPA" },
      { id: 94157, value: "SPF" },
      { id: 93712, value: "SPH" },
      { id: 94177, value: "SPI" },
      { id: 93732, value: "TL3_S" },
      { id: 93895, value: "Acessórios" },
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
  "S7.1 - CONTROLE DE QUALIDADE - TAMPA",
  "S7.1.TAMPA.0 - REQUISIÇÃO DE TAMPA ",
  "S7.1.TAMPA.1 - TROCA DE TAMPA ",
  "S7.1.TAMPA.2 - QUALIDADE DA TAMPA",
  "S7.SUP.0 - CONTROLE DE QUALIDADE REPROVADO",
  "S7.SUP.1 - CONTROLE DE QUALIDADE - TAMPA",
  "S8 - DESTINO FINAL - ESTOQUE",
  "S8.1 - ARMAZENAGEM",
  //Status fora de garantia
  "F0.1 - CLIENTE ",
  "F0.2 -  SAC ",
  "F1 - NF Entrada ",
  "F2 - COLETA REVERSA",
  "F3 - ENTRADA ESTOQUE ",
  "F4 - LABORATÓRIO - LAUDO ",
  "F4.1 - LABORATÓRIO - REPARO DE PLACA",
  "F4.2 - IMPORTAÇÃO",
  "F4.3 - AGUARDAR OU DEVOLUÇÃO",
  "F4.4 - CASOS AGUARDANDO IMPORTAÇÃO",
  "F5 - COTAÇÃO ",
  "F5.1 -  CONFIRMAR COTAÇÃO ",
  "F5.2 -  ENVIO DOS DADOS PARA PAGAMENTO",
  "F5.3 -  COMPROVANTE DE PAGAMENTO ",
  "F5.4 -  CONFIRMAÇÃO DE PAGAMENTO",
  "F6 - NF SAÍDA",
  "F7 - ENVIO DO EQUIPAMENTO",
  "F7.1 - EXPEDIÇÃO",
  "F8 - RESOLUÇÃO",
];

const inverterArray = [
  "ARK",
  "GROHOME",
  "HOPE",
  "MAC",
  "MAX",
  "MIC",
  "MID",
  "MIN",
  "MOD",
  "Monitoramento",
  "MTLP_S",
  "MTL_S",
  "Outras_baterias",
  "S",
  "SC",
  "SPA",
  "SPF",
  "SPH",
  "SPI",
  "TL3_S",
  "Acessórios",
];

export { defaultFields, arrayStatus, inverterArray };
