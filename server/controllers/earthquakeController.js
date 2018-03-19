import * as fetcher from '../services/dataFetcher';
import { transformEarthquakes } from '../services/dataTransformer';
import config from '../config';

export function getEarthquakes(req, res) {
    return fetcher.fetchEarthquakes()
        .then(results => {
            const offset = parseInt(req.query.offset) || config.DEFAULT_OFFSET;
            const pageSize = parseInt(req.query.pageSize) || config.DEFAULT_PAGE_SIZE;
            const lat = parseInt(req.query.width) || config.LATITUDE_MAX;
            const long = parseInt(req.query.height) || config.LONGITUDE_MAX;
            const features = transformEarthquakes(results.features, offset, pageSize, lat, long);
            res.send({features, total: features.length});
        })
        .catch((e) => {
          console.log(`Error: ${e}`);
          res.status(500).send({ error: e.toString()});
        })
}
