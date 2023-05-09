export type CurrencyDataResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Map<string, number>;
};

export type IpDataResponse = {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  currency: string;
};

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

