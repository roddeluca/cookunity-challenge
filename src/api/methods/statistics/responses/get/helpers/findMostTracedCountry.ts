import { Country, TracedCountries } from '../../../../../types'

const findMostTracedCountry = (tracedCountries: TracedCountries): Country | undefined => {
    let highestValue = 0
    let countryCode: string | undefined

    for(const key in tracedCountries.countries){
        if (highestValue < tracedCountries.countries[key].timesTraced) {
            highestValue = tracedCountries.countries[key].timesTraced
            countryCode = key
        }
    }

    if (countryCode) return tracedCountries.countries[countryCode];
}

export default findMostTracedCountry;