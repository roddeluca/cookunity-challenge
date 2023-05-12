import { redisClient } from "../clients";
import { tracedCountriesKey } from "../methods/constants";
import { TracedCountries } from "../types";
import { deserializerTracedCountriesMapper } from './mappers'

const getTracedCountries = async (): Promise<TracedCountries | undefined> => {
  await redisClient.connect();

  const tracedCountries = await redisClient.get(tracedCountriesKey);

  await redisClient.disconnect();

  if (tracedCountries === null) return;

  return deserializerTracedCountriesMapper(tracedCountries);
};

export default getTracedCountries;
