import { DDPoint, Haversine } from "haversine-ts";
import { whiteHouseCoordinates } from '../../../../methods/constants'

const buildDistanceResponse = (lat: number, lon: number): number => {
  const currentCoordinates = new DDPoint(lat, lon);
  const whiteHousePoint = new DDPoint(whiteHouseCoordinates.lat, whiteHouseCoordinates.lon);
  const haversine = new Haversine();

  return parseFloat(
    haversine.getDistance(currentCoordinates, whiteHousePoint).toFixed(2)
  );
};

export default buildDistanceResponse;