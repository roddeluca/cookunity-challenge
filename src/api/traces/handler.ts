import { Request } from "express";
import { fetchIpData, fetchCurrencyData } from '../repositories'
import buildResponse from './responseBuilder'


const checkIfIPisNull = (ip: string) => ip.trim().length != 0;

const handlerPostTraces = async (req: Request) => {
  const ipParam: string = req.body.ip;

  if (checkIfIPisNull(ipParam)) {
    try {
        const ipData = await fetchIpData(ipParam)
        const symbolsData = await fetchCurrencyData(ipData.currency);
        
        const response = buildResponse(ipData, symbolsData)
        return response

    } catch (error) {
        throw error
    } 
    
  } else {
    throw new Error("Missing body");
  }
};

export default handlerPostTraces;
