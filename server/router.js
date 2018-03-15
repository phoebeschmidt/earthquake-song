import express from 'express';
import bodyParser from 'body-parser';
import * as earthquakeController from './controllers/earthquakeController';

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send("WORKING WITH REACT ROUTRE and body parser?");
});

//Supports query params offset, pageSize
router.get('/earthquakes', earthquakeController.getEarthquakes);

export default router;
