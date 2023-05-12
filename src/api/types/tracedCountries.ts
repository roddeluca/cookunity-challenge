export type Country = {
    countryName: string,
    distance: number,
    timesTraced: number
}

export type TracedCountries = {
    countries: Record<string, Country>
}

