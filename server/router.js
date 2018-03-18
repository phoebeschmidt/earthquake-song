import express from 'express';
import bodyParser from 'body-parser';
import * as earthquakeController from './controllers/earthquakeController';
import config from './config';

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send(config.HOMEPAGE_HTML);
});

router.get('/hello', (req, res) => {
  res.json("Hello World! From earthquake-song api.");
})

router.get('/earthquakes', earthquakeController.getEarthquakes);

export default router;
