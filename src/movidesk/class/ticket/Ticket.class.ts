import * as I from "../../interface/index";
import { defaultFields } from "./defalutFields";

export class Ticket {
  constructor(
    public readonly id: I.Ticket["id"],
    public readonly status: I.Ticket["status"],
    public readonly category: I.Ticket["category"],
    public readonly customFieldValues: I.Ticket["customFieldValues"],
    public fields: I.Fields = {}
  ) {}

  public withFields(fieldsToFind: I.FieldsToFind | string) {
    if (fieldsToFind === "default") {
      //console.log(defaultFields.createInvoice.defaultFields);

      return this.match(defaultFields.createInvoice.defaultFields);
    } else {
      return this.match(fieldsToFind);
    }
  }

  public getProcedure(ticketStatus: I.Ticket["status"]) {
    if (ticketStatus.startsWith("S")) {
      if (ticketStatus.split(".").includes("ND")) {
        return "nd";
      } else {
        return "dg";
      }
    }
  }

  public getInvoice(ticketStatus: string, procedure: string, fields: any) {
    let invoice = {
      product: {},
      sell: {},
      service: {},
    };

    if (procedure == "dg") {
      const should = {
        createOngoingInvoice:
          ticketStatus.slice(2, 4) == ".1" &&
          !fields.idOngoingInvoice &&
          !fields.urlOngoingInvoice,
        createOutgoingInvoice:
          ticketStatus.slice(2, 4) == ".2" &&
          !fields.idOngoingInvoice &&
          !fields.urlOngoingInvoice,
        retrieveOngoingInvoice:
          fields.idOngoingInvoice?.length > 0 &&
          !(fields.urlOngoingInvoice.length > 0),
        retrieveOutgoingInvoice:
          fields.idOutgoingInvoice?.length > 0 &&
          !(fields.urlOutgoingInvoice.length > 0),
      };

      const is = {
        ongoingInvoiceCancelled: fields.infoOngoingInvoice == "CANCELADA",
        outgoingInvoiceCancelled: fields?.infoOutgoingInvoice == "CANCELADA",
      };

      invoice.product = {
        ongoing: {
          toBeCreated: should.createOngoingInvoice,
          toBeRetrieved: should.retrieveOngoingInvoice,
          isCancelled: is.ongoingInvoiceCancelled,
        },
        outgoing: {
          toBeCreated: should.createOutgoingInvoice,
          toBeRetrieved: should.retrieveOngoingInvoice,
          isCancelled: is.outgoingInvoiceCancelled,
        },
      };
    }
    return invoice;
  }

  private match(fieldsToFind: any) {
    this.customFieldValues.forEach((customField: any) => {
      fieldsToFind.forEach((field: any) => {
        if (customField.customFieldId == field.id) {
          if (customField?.value != null) {
            this.fields = {
              ...this.fields,
              ...{ [field.value]: customField.value },
            };
          } else if (customField?.items[0]?.customFieldItem) {
            this.fields = {
              ...this.fields,
              ...{ [field.value]: customField.items[0].customFieldItem },
            };
          } else if (customField?.items[0]?.storageFileGuid) {
            this.fields = {
              ...this.fields,
              ...{ [field.value]: customField.items[0].storageFileGuid },
            };
          } else {
            this.fields = {
              ...this.fields,
              ...{ [field.value]: "" },
            };
          }
        }
      });
    });
    return this;
  }
}
