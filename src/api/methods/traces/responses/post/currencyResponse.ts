import getSymbolFromCurrency from "currency-symbol-map";
import { CurrencyDataResponse } from "../../../../types";
import { TracesCurrencyResponse } from "../../../../types";
import { defaultCurrencySymbol } from '../../../../methods/constants'

const buildCurrencyResponse = (
  currencyData: CurrencyDataResponse
): TracesCurrencyResponse[] => {
  let response: TracesCurrencyResponse[] = [];

  currencyData.rates.forEach((value, key) => {
    response.push({
      iso: key,
      symbol: getSymbolFromCurrency(key) || defaultCurrencySymbol,
      conversionRate: value,
    });
  });

  response.push({
    iso: currencyData.base,
    symbol: getSymbolFromCurrency(currencyData.base) || defaultCurrencySymbol,
    conversionRate: 1,
  });

  return response;
};

export default buildCurrencyResponse;