import { IpDataResponse, CurrencyDataResponse } from "../../../../types";
import { TracesResponse } from "../../../../types";
import buildCurrencyResponse from "./currencyResponse";
import buildDistanceResponse from "./distanceResponse";

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
    distance_to_usa: buildDistanceResponse(ipData.lat, ipData.lon),
  };
};


export default buildResponse;