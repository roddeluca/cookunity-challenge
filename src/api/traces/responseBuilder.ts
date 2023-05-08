import getSymbolFromCurrency from "currency-symbol-map";
import { DDPoint, Haversine } from "haversine-ts";
import { TracesCurrencyResponse, TracesResponse, IpDataResponse, CurrencyDataResponse } from '../models'

const buildCurrencyResponse = (
  currencyData: CurrencyDataResponse
): TracesCurrencyResponse[] => {
  let response: TracesCurrencyResponse[] = [];

  currencyData.rates.forEach((value, key) => {
    response.push({
      iso: key,
      symbol: getSymbolFromCurrency(key) || "$",
      conversionRate: value,
    });
  });

  response.push({
    iso: currencyData.base,
    symbol: getSymbolFromCurrency(currencyData.base) || "$",
    conversionRate: 1,
  });

  return response;
};

const buildDistance = (lat: number, lon: number): number => {
  const currentCoordinates = new DDPoint(lat, lon);
  const whiteHouseCoordinates = new DDPoint(38.897733, -77.036531);
  const haversine = new Haversine();

  return parseFloat(haversine.getDistance(currentCoordinates, whiteHouseCoordinates).toFixed(2));
};

const buildResponse = (
  ipData: IpDataResponse,
  currencyData: CurrencyDataResponse
): TracesResponse => {
  return {
    ip: ipData.query,
    name: ipData.country,
    code: ipData.countryCode,
    lat: ipData.lat,
    lon: ipData.lon,
    currencies: buildCurrencyResponse(currencyData),
    distance_to_usa: buildDistance(ipData.lat, ipData.lon),
  };
};

export default buildResponse;
