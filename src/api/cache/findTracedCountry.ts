import { Country, TracedCountries } from '../types'

const findTracedCountry = (countryCode: string, tracedCountries: TracedCountries): Country | undefined => tracedCountries.countries[countryCode]

export default findTracedCountry;