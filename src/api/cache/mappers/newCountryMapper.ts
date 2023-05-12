import { Country, TracesResponse } from '../../types'

const newCountryMapper = (tracesResponse: TracesResponse): Country => {
    return {
        countryName: tracesResponse.name,
        distance: tracesResponse.distance_to_usa,
        timesTraced: 0
    }
}

export default newCountryMapper;