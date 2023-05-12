import { TracedCountries, StatisticsResponse } from '../../../../types'
import { findMostTracedCountry, findLongestDistanceCountry, formatResponse } from './helpers/'

const buildResponse = (tracedCountries: TracedCountries): StatisticsResponse => {
    return {
        longest_distance: formatResponse(findLongestDistanceCountry(tracedCountries)),
        most_traced: formatResponse(findMostTracedCountry(tracedCountries))
    }
}

export default buildResponse;