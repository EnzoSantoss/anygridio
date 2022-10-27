import * as I from "../../interface/index";
import { defaultFields } from "./defalutFields";

export class Ticket {
  constructor(
    public readonly id: I.Ticket["id"],
    public readonly status: I.Ticket["status"],
    public readonly category: I.Ticket["category"],
    public readonly customFieldValues: I.Ticket["customFieldValues"],
    public readonly clients: I.Ticket["clients"],
    public readonly createdDate: I.Ticket["createdDate"],
    public readonly urgency: I.Ticket["urgency"],
    public readonly owner: I.Ticket["owner"],
    public readonly serviceFirstLevel: I.Ticket["serviceFirstLevel"],
    public fields: I.Fields = {},
    public procedure: string | null = null
  ) {}

  public withFields(fieldsToFind: I.FieldsToFind[] | string) {
    if (fieldsToFind === "default") {
      //console.log(defaultFields.createInvoice.defaultFields);

      return this.match(defaultFields.createInvoice.defaultFields);
    }
    if (fieldsToFind === "CPF") {
      return this.match(defaultFields.createInvoice.buyerTypeFields.CPF);
    }
    if (fieldsToFind === "PJ") {
      return this.match(defaultFields.createInvoice.buyerTypeFields.PJ);
    } else {
      return this.match(fieldsToFind);
    }
  }

  public getProcedure() {
    if (this.status.startsWith("S")) {
      if (this.status.split(".").includes("ND")) {
        this.procedure = "nd";
        return this;
      } else {
        this.procedure = "dg";
        return this;
      }
    }
    if (this.status.startsWith("F")) {
      this.procedure = "fg";
      return this;
    }
  }

  public getInvoice() {
    let invoice = {
      product: {},
      sell: {},
      service: {},
    };

    if (this.procedure == "dg") {
      const should = {
        createOngoingInvoice:
          this.status.slice(2, 4) == ".1" &&
          !this.fields.idOngoingInvoice &&
          !this.fields.urlOngoingInvoice,
        createOutgoingInvoice:
          this.status.slice(2, 4) == ".2" &&
          !this.fields.idOngoingInvoice &&
          !this.fields.urlOngoingInvoice,
        retrieveOngoingInvoice:
          this.fields.idOngoingInvoice?.length > 0 &&
          !(this.fields.urlOngoingInvoice.length > 0),
        retrieveOutgoingInvoice:
          this.fields.idOutgoingInvoice?.length > 0 &&
          !(this.fields.urlOutgoingInvoice.length > 0),
      };

      const is = {
        ongoingInvoiceCancelled: this.fields.infoOngoingInvoice == "CANCELADA",
        outgoingInvoiceCancelled:
          this.fields?.infoOutgoingInvoice == "CANCELADA",
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
