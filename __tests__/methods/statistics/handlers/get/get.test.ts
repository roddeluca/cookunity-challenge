import redis from "redis";
import dotenv from "dotenv";
import { getHandler } from "../../../../../src/api/methods/statistics/handlers";
import { tracedCountriesKey } from "../../../../../src/api/methods/constants";

dotenv.config({ path: `./.env` });

describe("GET /statistics", () => {
  describe("Test traces getHandler", () => {
    it("with success response", async () => {
      // Given
      const redisClient = redis.createClient();
      redisClient.set(
        tracedCountriesKey,
        '{"countries":{"JP":{"countryName":"Japan","distance":10913.03,"timesTraced":2},"FR":{"countryName":"France","distance":6169.65,"timesTraced":7}}}'
      );

      // When
      const response = await getHandler();

      // Then
      expect(response).toEqual({
        longest_distance: {
          country: "Japan",
          value: 2,
        },
        most_traced: {
          country: "France",
          value: 7,
        },
      });
    });

    it("with failure response", async () => {
      // Given
      const redisClient = redis.createClient();
      redisClient.set(tracedCountriesKey, '{"countries":{}}');

      // When
      const response = await getHandler();

      // Then
      expect(response).toEqual({
        longest_distance: null,
        most_traced: null,
      });
    });
  });
});
