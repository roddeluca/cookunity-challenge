export type StatisticResponse = {
    country: string,
    value: number
}

export type StatisticsResponse = {
    longest_distance: StatisticResponse | null,
    most_traced: StatisticResponse | null
}