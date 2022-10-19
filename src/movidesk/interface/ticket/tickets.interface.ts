export interface TicketsData {
  createdDate: string;
  status: string;
  id: number;
  customFieldValues: any[];
}

export interface Tickets {
  name?: string | number;
  id?: string | number;
  range?: { from: string; to: string };
  options?: any;
  value?: string;
}
