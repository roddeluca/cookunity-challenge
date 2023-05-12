import { TracedCountries } from '../../../../../types'

const findLongestDistanceCountry = (tracedCountries: TracedCountries) => {
    let maxDistance = 0.0
    let countryCode: string | undefined
    
    for(const key in tracedCountries.countries){
        if (maxDistance < tracedCountries.countries[key].distance) {
            maxDistance = tracedCountries.countries[key].distance
            countryCode = key
        }
    }

    if (countryCode) return tracedCountries.countries[countryCode];
}

export default findLongestDistanceCountry;