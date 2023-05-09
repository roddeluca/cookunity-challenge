import axios from "axios";
import { IpDataResponse } from '../types'
import { defaultApplicationAccept } from "../methods/constants";

// ver dependences qs

const fetchIpData = async (ip: string): Promise<IpDataResponse> => {
  const url = `${process.env.IP_API_URL}/json/${ip}?fields=status,message,country,countryCode,lat,lon,currency,query`;

  try {
    const { data, status } = await axios.get<IpDataResponse>(url, {
      headers: {
        Accept: defaultApplicationAccept,
      },
    });

    return data;
  } catch (error) {
    throw new Error(axios.isAxiosError(error) ? error.message : "An unexpected error occurred");
  }
};

export default fetchIpData;
