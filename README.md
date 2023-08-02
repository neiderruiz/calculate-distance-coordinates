# 🚀 Welcome calculate distance coordinates!

Install in project

```shell
npm i @neiderruiz/calculate-distance-coordinates
```

```shell
import { getDistanceBetweenPoints } from "@neiderruiz/calculate-distance-coordinates";
```

or

```node
const { getDistanceBetweenPoints } = require("@neiderruiz/calculate-distance-coordinates");
```

usign

```js
const firstCoordinate = { latitude: 52.4, longitude: 18.7 }
const secondCoordenate = { latitude: 52.6, longitude: 18.3 }

//default kilometers
const distanceKilometers = getDistanceBetweenPoints(firstCoordinate,secondCoordenate)
// meters
const distanceMeters = getDistanceBetweenPoints(firstCoordinate,secondCoordenate, 'm')
// hectometro
const distanceHectometers = getDistanceBetweenPoints(firstCoordinate,secondCoordenate, 'hm')

```

- List all types distances
    - *Kilometers:* km
    - *Hectometers:* hm
    - *Decameters:* dam
    - *Meters:* m
    - *Decimeters:* dm
    - *Centimeters:* cm
    - *Milimeters:* mm
