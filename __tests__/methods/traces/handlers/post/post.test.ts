import redis from "redis";
import express from "express";
import axios from "axios";
import { postHandler } from "../../../../../src/api/methods/traces/handlers";
import { ipDataResponse } from "./__mocks__/ipDataResponseMock";
import { currencyDataResponse } from "./__mocks__/currencyDataResponseMock";
import { tracedCountriesKey } from "../../../../../src/api/methods/constants";
import dotenv from "dotenv";

dotenv.config({ path: `./.env` })

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("POST /traces", () => {
  describe("Test traces postHandler", () => {
    it("with success response", async () => {
      // Given
      mockedAxios.get.mockImplementation((url, options) => {
          if (url.includes(`${process.env.IP_API_URL}`)) {
            return Promise.resolve(ipDataResponse)
          } else if (url.includes(`${process.env.API_APILAYER_URL}`)) {
            return Promise.resolve(currencyDataResponse)
          } else {
            return Promise.resolve(null)
          }
      });
  
      const redisClient = redis.createClient();
      redisClient.set(
        tracedCountriesKey,
        '{"countries":{"JP":{"countryName":"Japan","distance":10913.03,"timesTraced":2},"FR":{"countryName":"France","distance":6169.65,"timesTraced":7}}}'
      );

      // When
      const response = await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
  
      // Then
      expect(response).toEqual({
        code: "UY",
        currencies: [],
        distance_to_usa: 8327.64,
        ip: "167.62.158.169",
        lat: -33.541,
        lon: -56.8927,
        name: "Uruguay"
      });
    });

    describe("with failure response", () => {
      it("without ip param", async () => {

        // Given
        mockedAxios.get.mockImplementation((url, options) => {
            if (url.includes(`${process.env.IP_API_URL}`)) {
              return Promise.resolve(ipDataResponse)
            } else if (url.includes(`${process.env.API_APILAYER_URL}`)) {
              return Promise.resolve(currencyDataResponse)
            } else {
              return Promise.resolve(null)
            }
        });
  
        try {
          // When
          await postHandler({ body: { ip: "" } } as express.Request)
        } catch (error) {

          // Then
          expect(error).toEqual(Error(`"ip" is not allowed to be empty`));
        }
      });
  
      it("when Ip Api client fails", async () => {
        // Given

        mockedAxios.get.mockImplementation((url, options) => {
            if (url.includes(`${process.env.IP_API_URL}`)) {
              return Promise.resolve(null)
            } else if (url.includes(`${process.env.API_APILAYER_URL}`)) {
              return Promise.resolve(currencyDataResponse)
            } else {
              return Promise.resolve(null)
            }
        });
    
        try {
          // When
          await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
        } catch (error) {

          // Then
          expect(error).toEqual(Error("An unexpected error occurred"));
        }
      });

      it("when ApiLayer client fails", async () => {
        // Given
        mockedAxios.get.mockImplementation((url, options) => {
            if (url.includes(`${process.env.IP_API_URL}`)) {
              return Promise.resolve(ipDataResponse)
            } else if (url.includes(`${process.env.API_APILAYER_URL}`)) {
              return Promise.resolve(null)
            } else {
              return Promise.resolve(null)
            }
        });
    
        try {
          // When
          await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
        } catch (error) {
          // Then
          expect(error).toEqual(Error("An unexpected error occurred"));
        }
      });

    })
  })
});