import * as fetcher from '../services/dataFetcher';
import { transformEarthquakes } from '../services/dataTransformer';
import config from '../config';

export function getEarthquakes(req, res) {
    return fetcher.fetchEarthquakes()
        .then(results => {
            const offset = parseInt(req.query.offset) || config.DEFAULT_OFFSET;
            const pageSize = parseInt(req.query.const) || config.DEFAULT_PAGE_SIZE;
            const features = transformEarthquakes(results.features, offset, pageSize);
            res.send({features, total: features.length});
        })
        .catch((e) => console.log(`Whoops! ${e}`))
}
