import axios from "axios";
import { CurrencyDataResponse } from '../types'
import { defaultBaseCurrency, defaultApplicationAccept } from '../methods/constants'
import { ratesFormatter } from '../formatter'

const fetchCurrencyData = async (symbol: string) => {
  try {
    const { data, status } = await axios.get<CurrencyDataResponse>(
      `${process.env.API_APILAYER_URL}/fixer/latest?symbols=${symbol}&base=${defaultBaseCurrency}`,
      {
        headers: {
          apikey: `${process.env.APILAYER_APIKEY}`,
          Accept: defaultApplicationAccept,
        },
        transformResponse: (data) => {
          const jsonResponse = JSON.parse(data)

          return {
            success: jsonResponse.success,
            timestamp: jsonResponse.timestamp,
            base: jsonResponse.base,
            date: jsonResponse.date,
            rates: ratesFormatter(jsonResponse.rates)
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
