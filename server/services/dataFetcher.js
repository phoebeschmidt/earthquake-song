import config from '../config';
import fetch from 'node-fetch';
import { transformEarthquakes } from './dataTransformer';

export function fetchEarthquakes(offset = null, pageSize = null) {
    return fetch(config.SUMMARY_EARTHQUAKES_URL)
        .then(results => {
            return results.json();
        })
        .then(body => {
          console.log(body.type)
            const offset = offset || config.DEFAULT_OFFSET;
            const pageSize = pageSize || config.DEFAULT_PAGE_SIZE;
            return transformEarthquakes(body.features.slice(offset, pageSize));
        })
}
