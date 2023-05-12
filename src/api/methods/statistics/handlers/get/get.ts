import { getTracedCountries } from '../../../../cache'
import { StatisticsResponse } from '../../../../types'
import { buildEmptyResponse, buildResponse } from '../../responses'

const getHandler = async (): Promise<StatisticsResponse> => {
    const tracedCountries = await getTracedCountries();

    if (tracedCountries === undefined) {
        return buildEmptyResponse()
    } else {
        return buildResponse(tracedCountries)
    }
  };
  
  export default getHandler;
  