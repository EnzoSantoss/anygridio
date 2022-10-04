export interface TicketsData {
  createdDate: string;
  status: string;
  id: number;
  customFieldValues: any[];
}

export interface Tickets {
  name?: string;
  value: string;
}
