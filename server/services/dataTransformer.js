import { earthquake } from '../models/earthquakes';
import config from '../config';

export function transformEarthquakes(quakes) {
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

export function scaleArray(times, min, max) {
    const totalMin = Math.min(...times);
    const totalMax = Math.max(...times);
    const scaleTimesFunc = myScaleFunc(min, max, totalMin, totalMax);
    return times.map(scaleTimesFunc);
}

function myScaleFunc(minScale, maxScale, minActual, maxActual) {
    return (x) => {
      return scaleFunc(x, minScale, maxScale, minActual, maxActual);
    }
}

export function scaleFunc(x, minScale, maxScale, minActual, maxActual) {
    return (maxScale - minScale) * (x - minActual) / (maxActual - minActual);
}
