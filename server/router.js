import express from 'express';
import bodyParser from 'body-parser';

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send("WORKING WITH REACT ROUTRE and body parser?");
});

export default router;
