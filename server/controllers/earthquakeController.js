import * as fetcher from '../services/dataFetcher';
import { transformEarthquakes } from '../services/dataTransformer';
import config from '../config';
import fs from 'fs';
import path from 'path';

export function getEarthquakes(req, res) {
    return fetcher.fetchEarthquakes()
        .then(results => {
            const offset = parseInt(req.query.offset) || config.DEFAULT_OFFSET;
            const pageSize = parseInt(req.query.pageSize) || config.DEFAULT_PAGE_SIZE;
            const features = transformEarthquakes(results.features, offset, pageSize);
            res.send({features, total: features.length});
        })
        .catch((e) => {
          console.log(`Error: ${e}`);
          res.status(500).send({ error: e.toString()});
        })
}

export function getSound(req, res) {
    const soundFilePath = path.join(__dirname, "../static/piano-c.wav");

    fs.stat(soundFilePath, (err, stat) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + soundFilePath
        });
        fs.createReadStream(soundFilePath).pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    })
}
