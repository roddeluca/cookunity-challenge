import { StatisticsResponse } from '../../../../types'


const buildEmptyResponse = (): StatisticsResponse => {
    return {
        longest_distance: null,
        most_traced: null

    }
}

export default buildEmptyResponse;