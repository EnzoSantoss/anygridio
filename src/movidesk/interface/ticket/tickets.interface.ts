export interface TicketsData {
  createdDate: string;
  status: string;
  id: number;
  customFieldValues: any[];
}

export interface Tickets {
  customFieldId: number;
  serialNumber: string;
}
