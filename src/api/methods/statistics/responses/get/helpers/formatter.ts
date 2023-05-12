import { Country, StatisticResponse } from '../../../../../types'

const formatResponse = (country: Country | undefined): StatisticResponse | null => {
    if (country === undefined) return null

    return {
        country: country.countryName,
        value: country.timesTraced
    }
}

export default formatResponse;