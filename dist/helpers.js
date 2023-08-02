"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radToDeg = exports.degrees_to_radians = void 0;
const degrees_to_radians = (degrees) => {
    const pi = Math.PI;
    return degrees * (pi / 180);
};
exports.degrees_to_radians = degrees_to_radians;
const radToDeg = (rad) => {
    return rad * (180.0 / Math.PI);
};
exports.radToDeg = radToDeg;
