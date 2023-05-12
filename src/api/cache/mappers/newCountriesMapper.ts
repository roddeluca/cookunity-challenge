import { TracedCountries, Country, TracesResponse } from '../../types'
import newCountryMapper from './newCountryMapper'

const newCountriesMapper = (tracesResponse: TracesResponse): TracedCountries => {
    return {
        countries: {
            [tracesResponse.code]: newCountryMapper(tracesResponse)
        }
    }
}

export default newCountriesMapper;