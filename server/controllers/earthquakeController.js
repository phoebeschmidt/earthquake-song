import * as fetcher from '../services/dataFetcher';

export function getEarthquakes(req, res) {
    return fetcher.fetchEarthquakes(parseInt(req.query.offset), parseInt(req.query.pageSize)) //do some try/catch for parsing int here
        .then((results) => {
            res.send(results);
        })
        .catch((e) => console.log(`Whoops! ${e}`))
}
