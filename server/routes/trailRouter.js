const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');

router.get('/interested', trailController.getInterests, (req, res) => {
  console.log('trail router get request');
  res.status(200).json(res.locals.trailInts);
});

router.post('/interested', trailController.postInterest, (req, res) => {
  console.log('trail router interest posted')
  res.status(200).json(res.locals.trailInts);
});

router.post('/visited', trailController.postVisit, (req, res) => {
  res.status(200).json(res.locals.trailVisits);
});

module.exports = router;
