import { Request } from "express";
import { fetchIpData, fetchCurrencyData } from "../../../../clients";
import { buildPostResponse } from "../../responses";
import { TracesResponse } from "../../../../types";
import { schema } from "./schema";
import { saveTracedCountry } from "../../../../cache";

const postHandler = async ({ body }: Request): Promise<TracesResponse> => {
  try {
    const { value } = schema.validate(body);
    const ipData = await fetchIpData(value.ip);
    const symbolsData = await fetchCurrencyData(ipData.currency);

    const response = buildPostResponse(ipData, symbolsData);
    saveTracedCountry(response);

    return response;
  } catch (error) {
    throw error;
  }
};

export default postHandler;
