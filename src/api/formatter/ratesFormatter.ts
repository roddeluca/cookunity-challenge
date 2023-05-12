const ratesFormatter = (rates: any): Map<string, number> => new Map(Object.entries<number>(rates))

export default ratesFormatter;