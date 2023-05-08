import axios from "axios";
import { IpDataResponse } from '../models'

const fetchIpData = async (ip: string): Promise<IpDataResponse> => {
  const url = `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,lat,lon,currency,query`;

  try {
    const { data, status } = await axios.get<IpDataResponse>(url, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    throw new Error(axios.isAxiosError(error) ? error.message : "An unexpected error occurred");
  }
};

export default fetchIpData;
