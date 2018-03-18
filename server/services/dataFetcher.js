import config from '../config';
import fetch from 'node-fetch';

export function fetchEarthquakes() {
    return fetch(config.SUMMARY_EARTHQUAKES_URL)
        .then(results => {
            return results.json();
        });
}
