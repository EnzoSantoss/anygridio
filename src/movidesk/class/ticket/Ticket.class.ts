import * as I from "../../interface/index";
import { _fields2Find } from "./defalutFields";

export class Ticket {
  constructor(
    public readonly id: I.Ticket["id"],
    public readonly status: I.Ticket["status"],
    public readonly category: I.Ticket["category"],
    public readonly customFieldValues: I.Ticket["customFieldValues"],
    public fields: I.Fields = {}
  ) {}

  public withFields(fieldsToFind: any) {
    if (fieldsToFind === "default") {
      //match(_fields2Find.invoice.create("dg"))

      this.customFieldValues.forEach((customField: any) => {
        _fields2Find.invoice.create("dg").forEach((field: any) => {
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

      //end of if
    } else {
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

  public getProcedure(ticketStatus: I.Ticket["status"]) {
    if (ticketStatus.startsWith("S")) {
      if (ticketStatus.split(".").includes("ND")) {
        return "nd";
      } else {
        return "dg";
      }
    }
  }
}

// match(fieldsToFind){

//   this.customFieldValues.forEach((customField:any) => {
//     fieldsToFind.invoice.create("dg").forEach((field: any) => {
//       if (customField.customFieldId == field.id) {
//         if (customField?.value != null) {
//           this.fields = {
//             ...this.fields,
//             ...{ [field.value]: customField.value },
//           };
//         } else if (customField?.items[0]?.customFieldItem) {
//           this.fields = {
//             ...this.fields,
//             ...{ [field.value]: customField.items[0].customFieldItem },
//           };
//         } else if (customField?.items[0]?.storageFileGuid) {
//           this.fields = {
//             ...this.fields,
//             ...{ [field.value]: customField.items[0].storageFileGuid },
//           };
//         } else {
//           this.fields = {
//             ...this.fields,
//             ...{ [field.value]: "" },
//           };
//         }
//       }
//     });
//   });
//   return this;

// }
