const  _fields2Find =  {
    invoice: {
      create(procedure:any) {
        let fieldsToFind:any = [];
        if (procedure == "dg") {
          fieldsToFind = [
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
            { id: 108202, value: "deliveryComplement" }, // PF e PJ (Caso endereço de entrega difere endereço NF)
          ];
        } else if (procedure == "nd") {
        } else if (procedure == "fg") {
        } else if (procedure == "pp") {
        }
        return fieldsToFind;
      },
      correct() {},
      delete() {},
    },
  };

export {_fields2Find}
  