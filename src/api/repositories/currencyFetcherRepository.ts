import axios from "axios";
import { CurrencyDataResponse } from '../models'


const fetchCurrencyData = async (symbol: string) => {
  try {
    const { data, status } = await axios.get<CurrencyDataResponse>(
      `https://api.apilayer.com/fixer/latest?symbols=${symbol}&base=USD`,
      {
        headers: {
          apikey: "wFU3E13cZp30vlmFSI8FVzWauDB9QdVA",
          Accept: "application/json",
        },
        transformResponse: (data) => {
          const jsonResponse = JSON.parse(data)

          return {
            success: jsonResponse.success,
            timestamp: jsonResponse.timestamp,
            base: jsonResponse.base,
            date: jsonResponse.date,
            rates: new Map(Object.entries(jsonResponse.rates))
          }
        }
      }
    );

    return data

  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) ? error.message : "An unexpected error occurred"
    );
  }
};

export default fetchCurrencyData;
