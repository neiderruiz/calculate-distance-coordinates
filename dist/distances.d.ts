type Coordinate = {
    latitude: number;
    longitude: number;
};
type UnitDistance = "km" | "m" | "dam" | "hm" | "dm" | "cm" | "mm";
declare const getDistanceBetweenPoints: (first_coordinate: Coordinate, second_coordinate: Coordinate, unit?: UnitDistance) => number;
declare const calculateRangeCoordinates: (coordenates: Coordinate[], typeMeasure?: UnitDistance, randDistance?: number) => {
    distance: number;
    inRange: boolean;
    latitude: number;
    longitude: number;
}[];
export { getDistanceBetweenPoints, calculateRangeCoordinates };
