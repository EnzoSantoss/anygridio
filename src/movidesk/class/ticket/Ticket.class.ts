import * as I from '../../interface/index';

export class Ticket {
    constructor(
        public readonly id: I.Ticket['id'],
        public readonly status: I.Ticket['status'],
        public readonly category: I.Ticket['category'],
        protected readonly customFieldValues: I.Ticket['customFieldValues'],
        public fields: I.Fields = {}
    ) {}

    public withFields(
        fieldsToFind: I.FieldsToFind[]
    ) {
        this.customFieldValues.forEach((customField) => {
            fieldsToFind.forEach((field) => {
                if (customField.customFieldId == field.id) {
                    if (customField?.value != null) {
                        this.fields = {
                            ...this.fields,
                            ...{ [field.value]: customField.value }
                        };
                    } else if (customField?.items[0]?.customFieldItem) {
                        this.fields = {
                            ...this.fields,
                            ...{ [field.value]: customField.items[0].customFieldItem }
                        };
                    } else if (customField?.items[0]?.storageFileGuid) {
                        this.fields = {
                            ...this.fields,
                            ...{ [field.value]: customField.items[0].storageFileGuid }
                        };
                    } else {
                        this.fields = {
                            ...this.fields,
                            ...{ [field.value]: '' }
                        };
                    }
                }
            })
        });
        return this;
    }
}