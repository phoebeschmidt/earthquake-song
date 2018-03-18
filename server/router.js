import express from 'express';
import bodyParser from 'body-parser';
import * as earthquakeController from './controllers/earthquakeController';
import config from './config';

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send(config.HOMEPAGE_HTML);
});

//Supports query params offset, pageSize
router.get('/earthquakes', earthquakeController.getEarthquakes);

export default router;
