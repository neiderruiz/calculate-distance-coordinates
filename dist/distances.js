"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRangeCoordinates = exports.getDistanceBetweenPoints = void 0;
const helpers_1 = require("./helpers");
var unitConverter;
(function (unitConverter) {
    unitConverter[unitConverter["KM"] = 1] = "KM";
    unitConverter[unitConverter["HM"] = 100] = "HM";
    unitConverter[unitConverter["DAM"] = 10] = "DAM";
    unitConverter[unitConverter["M"] = 1000] = "M";
    unitConverter[unitConverter["DM"] = 10000] = "DM";
    unitConverter[unitConverter["CM"] = 100000] = "CM";
    unitConverter[unitConverter["MM"] = 1000000] = "MM";
})(unitConverter || (unitConverter = {}));
const getDistanceBetweenPoints = (first_coordinate, second_coordinate, unit) => {
    const { latitude: latitude1, longitude: longitude1 } = first_coordinate;
    const { latitude: latitude2, longitude: longitude2 } = second_coordinate;
    const theta = longitude1 - longitude2;
    let distance = Math.sin((0, helpers_1.degrees_to_radians)(latitude1)) *
        Math.sin((0, helpers_1.degrees_to_radians)(latitude2)) +
        Math.cos((0, helpers_1.degrees_to_radians)(latitude1)) *
            Math.cos((0, helpers_1.degrees_to_radians)(latitude2)) *
            Math.cos((0, helpers_1.degrees_to_radians)(theta));
    distance = Math.acos(distance);
    distance = (0, helpers_1.radToDeg)(distance);
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
exports.getDistanceBetweenPoints = getDistanceBetweenPoints;
const calculateRangeCoordinates = (coordenates, typeMeasure, randDistance) => {
    const result = {};
    let limitDistance = 100;
    if (randDistance)
        limitDistance = randDistance;
    let type = "km";
    if (typeMeasure)
        type = typeMeasure;
    coordenates.forEach((cordenate) => {
        coordenates.forEach((review) => {
            const resultDistance = getDistanceBetweenPoints(review, cordenate, typeMeasure);
            if (resultDistance)
                if (resultDistance < limitDistance && limitDistance != 0) {
                    result[`${JSON.stringify(review)}`] = {
                        ...review,
                        distance: resultDistance,
                        inRange: true,
                    };
                }
                else {
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
exports.calculateRangeCoordinates = calculateRangeCoordinates;
