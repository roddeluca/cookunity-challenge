import express from "express";
import axios from "axios";
import { postHandler } from "../../../../../src/api/methods/traces/handlers";
import { ipDataResponse } from "./__mocks__/ipDataResponseMock";
import { currencyDataResponse } from "./__mocks__/currencyDataResponseMock";
import dotenv from "dotenv";

dotenv.config({ path: `./.env` })

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test traces postHandler", () => {
  describe("POST /traces", () => {
    it("with success response", async () => {
      mockedAxios.get.mockImplementation((url, options) => {
          if (url.includes(`${process.env.IP_API_URL}`)) {
            return Promise.resolve(ipDataResponse)
          } else if (url.includes(`${process.env.API_APILAYER_URL}`)) {
            return Promise.resolve(currencyDataResponse)
          } else {
            return Promise.resolve(null)
          }
      });
  
      const response = await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
  
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
          await postHandler({ body: { ip: "" } } as express.Request)
        } catch (error) {
          expect(error).toEqual(Error(`"ip" is not allowed to be empty`));
        }
      });
  
      it("when Ip Api client fails", async () => {
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
          await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
        } catch (error) {
          expect(error).toEqual(Error("An unexpected error occurred"));
        }
      });

      it("when ApiLayer client fails", async () => {
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
          await postHandler({ body: { ip: "167.62.158.169" } } as express.Request)
        } catch (error) {
          expect(error).toEqual(Error("An unexpected error occurred"));
        }
      });

    })
  })
});