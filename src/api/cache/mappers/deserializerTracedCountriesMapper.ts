import { TracedCountries } from "../../types";

export const deserializerTracedCountriesMapper = (tracedCountries: string): TracedCountries => JSON.parse(tracedCountries)
