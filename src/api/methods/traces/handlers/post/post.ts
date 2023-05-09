import { Request } from "express";
import { fetchIpData, fetchCurrencyData } from '../../../../clients'
import { buildPostResponse } from '../../responses'
import { TracesResponse } from "../../../../types";
import { schema } from './schema'

const postHandler = async ({ body }: Request): Promise<TracesResponse> => {
  const { error, value } = schema.validate(body);

  if (error === undefined) {
    try {
        const ipData = await fetchIpData(value.ip)
        const symbolsData = await fetchCurrencyData(ipData.currency);
        
        const response = buildPostResponse(ipData, symbolsData)
        return response

    } catch (error) {
        throw error
    } 
    
  } else {
    throw new Error(error.message);
  }
};

export default postHandler;
