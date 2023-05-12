

export type TracesCurrencyResponse = {
  iso: string;
  symbol: string;
  conversionRate: number;
}

export type TracesResponse = {
  ip: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  currencies: TracesCurrencyResponse[];
  distance_to_usa: number;
}

