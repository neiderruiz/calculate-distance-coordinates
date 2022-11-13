import { degrees_to_radians, radToDeg } from "./helpers";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type UnitDistance = "km" | "m" | "dam" | "hm" | "dm" | "cm" | "mm";

enum unitConverter {
  KM = 1,
  HM = 100,
  DAM = 10,
  M = 1000,
  DM = 10000,
  CM = 100000,
  MM = 1000000,
}

const getDistanceBetweenPoints = (
  first_coordinate: Coordinate,
  second_coordinate: Coordinate,
  unit?: UnitDistance
) => {
  const { latitude: latitude1, longitude: longitude1 } = first_coordinate;
  const { latitude: latitude2, longitude: longitude2 } = second_coordinate;
  const theta = longitude1 - longitude2;
  let distance =
    Math.sin(degrees_to_radians(latitude1)) *
      Math.sin(degrees_to_radians(latitude2)) +
    Math.cos(degrees_to_radians(latitude1)) *
      Math.cos(degrees_to_radians(latitude2)) *
      Math.cos(degrees_to_radians(theta));
  distance = Math.acos(distance);
  distance = radToDeg(distance);
  distance = distance * 60 * 1.1515;
  const distanceKm = distance * 1.609344;
  switch (unit) {
    case "km":
      distance = distanceKm;
      break;
    case "hm":
      distance = distanceKm / unitConverter.KM;
    case "dam":
      distance = distanceKm / unitConverter.DAM;
      break;
    case "m":
      distance = distanceKm * unitConverter.M;
      break;
    case "dm":
      distance = distanceKm * unitConverter.DM;
      break;
    case "cm":
      distance = distanceKm * unitConverter.CM;
      break;
    case "mm":
      distance = distanceKm * unitConverter.MM;
      break;
    default:
      distance = distanceKm;
      break;
  }
  return distance;
};

const calculateRangeCoordinates = (
  coordenates: Coordinate[],
  typeMeasure?: UnitDistance,
  randDistance?: number
) => {
  const result: {
    [key: string]: {
      distance: number;
      inRange: boolean;
      latitude: number;
      longitude: number;
    };
  } = {};
  let limitDistance = 100;
  if (randDistance) limitDistance = randDistance;
  let type = "km";
  if (typeMeasure) type = typeMeasure;
  coordenates.forEach((cordenate) => {
    coordenates.forEach((review) => {
      const resultDistance = getDistanceBetweenPoints(
        review,
        cordenate,
        typeMeasure
      );
      if (resultDistance)
        if (resultDistance < limitDistance && limitDistance != 0) {
          result[`${JSON.stringify(review)}`] = {
            ...review,
            distance: resultDistance,
            inRange: true,
          };
        } else {
          if (!result[`${JSON.stringify(review)}`]) {
            result[`${JSON.stringify(review)}`] = {
              ...review,
              distance: resultDistance,
              inRange: false,
            };
          }
        }
    });
  });

  return Object.entries(result).map(([_, value]) => value);
};

export { getDistanceBetweenPoints, calculateRangeCoordinates };
