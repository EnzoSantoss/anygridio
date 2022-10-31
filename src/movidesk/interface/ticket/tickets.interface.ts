export interface TicketsData {
  createdDate: string;
  status: string;
  id: number;
  customFieldValues: any[];
}

export interface Tickets {
  name?: string | number;
  id?: string | number;
  range?: range;
  options?: any;
  value?: string;
}

type range = {
  from: string;
  to: string;
  anygridOnly: boolean;
};
