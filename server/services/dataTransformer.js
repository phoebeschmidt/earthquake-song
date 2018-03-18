import { earthquake } from '../models/earthquakes';
import config from '../config';

export function transformEarthquakes(quakes, offset, pageSize) {
    quakes = quakes.slice(offset, pageSize);
    const scaledTimes = scaleArray(quakes.map(x => x.properties.time), config.TIMESCALE_MIN, config.TIMESCALE_MAX);
    const scaledLatitudes = scaleArray(quakes.map(x => x.geometry.coordinates[0]), config.LATITUDE_MIN, config.LATITUDE_MAX);
    const scaledLongitudes = scaleArray(quakes.map(x => x.geometry.coordinates[1]), config.LONGITUDE_MIN, config.LONGITUDE_MAX);
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
            scaledLatitude: scaledLatitudes[i],
            scaledLongitude: scaledLongitudes[i],
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
