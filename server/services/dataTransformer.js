import { earthquake } from '../models/earthquakes';
import config from '../config';

export function transformEarthquakes(quakes, offset, pageSize, maxLat, maxLong) {
    quakes = quakes.slice(offset, pageSize);
    const scaledTimes = scaleArray(quakes.map(x => x.properties.time), config.TIMESCALE_MIN, maxLat);
    return quakes.map((quake, i) => {
        const {mag, place, time, updated, tsunami, gap, nst} = quake.properties;
        const [longitude, latitude, depth] = quake.geometry.coordinates;
        return {
          mag,
          place,
          time,
          scaledTime: scaledTimes[i],
          updated,
          tsunami,
          gap,
          nst,
          coordinates: {
            latitude,
            longitude,
            depth
          }
        };
    })

}

export function scaleArray(times, minScale, maxScale) {
    const minTotal = Math.min(...times);
    const maxTotal = Math.max(...times);
    const scaleFunc = myScaleFunc(minScale, maxScale, minTotal, maxTotal);
    return times.map(scaleFunc);
}

function myScaleFunc(minScale, maxScale, minActual, maxActual) {
    return (x) => {
      return scaleFunc(x, minScale, maxScale, minActual, maxActual);
    }
}

export function scaleFunc(x, minScale, maxScale, minActual, maxActual) {
    return (maxScale - minScale) * (x - minActual) / (maxActual - minActual);
}
