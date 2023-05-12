import { redisClient } from "../clients";
import { tracedCountriesKey } from "../methods/constants";
import { TracesResponse, TracedCountries, Country } from "../types";
import { newCountriesMapper, newCountryMapper, deserializerTracedCountriesMapper } from "./mappers";
import findTracedCountry from "./findTracedCountry";

const saveTracedCountry = async (tracesResponse: TracesResponse) => {
  await redisClient.connect();
  const tracedCountries = await redisClient.get(tracedCountriesKey);

  if (tracedCountries === null) {
    const newTracedCountries = newCountriesMapper(tracesResponse);

    newTracedCountries.countries[tracesResponse.code].timesTraced++;

    await redisClient.set(
      tracedCountriesKey,
      JSON.stringify(newTracedCountries)
    );

  } else {
    const parsedTracedCountries: TracedCountries = deserializerTracedCountriesMapper(tracedCountries);
    
    const country = findTracedCountry(
      tracesResponse.code,
      parsedTracedCountries
    ) || newCountryMapper(tracesResponse);

    country.timesTraced++;

    parsedTracedCountries.countries[tracesResponse.code] = country;

    await redisClient.set(
      tracedCountriesKey,
      JSON.stringify(parsedTracedCountries)
    );
  }

  await redisClient.disconnect();
};

export default saveTracedCountry;
