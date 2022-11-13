const degrees_to_radians = (degrees: number) => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

const radToDeg = (rad: number) => {
  return rad * (180.0 / Math.PI);
};

export { degrees_to_radians, radToDeg };
